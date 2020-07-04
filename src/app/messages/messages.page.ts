import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  talks: any = [];

  constructor(private api: ApiService, private db: AngularFireDatabase, private msgService: MessageService, private router: Router) { }

  ngOnInit() {
    this.api.postData(this.api.userData, 'talksGet').then((result) => {
      this.talks = result;
    });

    // tslint:disable-next-line:radix
    this.db.object('/check/' + parseInt(this.api.userData.user_id) + '/status').valueChanges().subscribe(data => {
      // console.log(data);
      if (Boolean(data)) {
        this.getTalks();
        // tslint:disable-next-line:radix
        this.db.object('/check/' + parseInt(this.api.userData.user_id) + '/status').set(false);
      }
    });
  }

  getTalks() {
    this.api.postData(this.api.userData, 'talksGet').then((result) => {
      this.talks = result;
      // console.log(result);
    });
  }

  // tslint:disable-next-line:variable-name
  goMsg(to_id: any, ad_id: any, ad_title: any, name: any) {
    const msgData = {
      to_id,
      ad_id,
      ad_title,
      name
    };
    this.msgService.setData(msgData);
    this.router.navigate(['/msg']);
  }

  timeConverter(time) {
    const a = new Date(time * 1000);
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const month = months[a.getMonth()];
    const date = a.getDate();
    return date + ' ' + month;
  }

}
