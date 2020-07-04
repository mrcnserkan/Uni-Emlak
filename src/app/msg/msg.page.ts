import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../services/message.service';
import { ApiService } from '../services/api.service';
import { IonContent } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.page.html',
  styleUrls: ['./msg.page.scss'],
})
export class MsgPage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  msgData: any;
  msgAPI: any = { user_id: '', token: '', msg: '', to_id: '', ad_id: '', ad_title: '', user1: '', user2: '' };
  msgGet: any = { user_id: '', token: '', to_id: '', ad_id: '' };
  msgs: any = [];
  msgInput = '';

  constructor(private api: ApiService, private msgService: MessageService, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.msgData = this.msgService.getData();
    this.msgAPI.user_id = this.api.userData.user_id;
    this.msgAPI.token = this.api.userData.auth_key;
    this.msgAPI.to_id = this.msgData.to_id;
    this.msgAPI.ad_id = this.msgData.ad_id;
    this.msgAPI.ad_title = this.msgData.ad_title;
    this.msgAPI.user1 = this.api.userData.name + ' ' + this.api.userData.surname;
    this.msgAPI.user2 = this.msgData.name;

    this.msgGet.user_id = this.api.userData.user_id;
    this.msgGet.token = this.api.userData.auth_key;
    this.msgGet.to_id = this.msgData.to_id;
    this.msgGet.ad_id = this.msgData.ad_id;

    this.api.postData(this.msgGet, 'msgGet').then((result) => {
      this.msgs = result;
      setTimeout(() => {
        this.content.scrollToBottom(0);
      }, 1);
      // this.loading = false;
      console.log(result);
    });

    // tslint:disable-next-line:radix
    this.db.object('/check/' + parseInt(this.api.userData.user_id) + '/status').valueChanges().subscribe(data => {
      // console.log(data);
      if (Boolean(data)) {
        this.getMsg();
        // tslint:disable-next-line:radix
        this.db.object('/check/' + parseInt(this.api.userData.user_id) + '/status').set(false);
      }
    });
  }

  getMsg() {
    this.api.postData(this.msgGet, 'msgGet').then((result) => {
      const temp: any = result;
      if (temp.length > this.msgs.length) {
        this.msgs = result;
        setTimeout(() => {
          this.content.scrollToBottom(400);
        }, 1);
      }
    });
  }

  msgSend() {
    if (this.msgInput.length > 0) {
      const date = Math.floor(new Date().getTime() / 1000);
      // console.log(this.msgInput);
      // tslint:disable-next-line:object-literal-shorthand
      this.msgs.push({ from_id: this.api.userData.user_id, to_id: this.msgAPI.to_id, msg: this.msgInput, date: date });
      this.msgInput = this.msgInput.replace(/'/g, '\\\'');
      this.msgInput = this.msgInput.replace(/"/g, '\\"');
      this.msgAPI.msg = this.msgInput;
      this.msgInput = '';
      // this.msgAPI = JSON.parse(this.msgAPI);
      this.api.postData(this.msgAPI, 'msgSend').then((result) => {
        // console.log(result);
      }, err => {
        // error state
      });

      // tslint:disable-next-line:radix
      const userid: number = parseInt(this.msgAPI.to_id);
      this.db.object('/check/' + userid + '/status').set(true);

      setTimeout(() => {
        this.content.scrollToBottom(400);
      }, 1);
    }
  }

}
