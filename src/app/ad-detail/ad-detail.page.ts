import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../services/api.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ServiceService } from '../services/service.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { IonContent, AlertController } from '@ionic/angular';
import * as Leaflet from 'leaflet';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.page.html',
  styleUrls: ['./ad-detail.page.scss'],
})
export class AdDetailPage implements OnInit, OnDestroy {

  @ViewChild(IonContent, { static: false }) content: IonContent;
  segment = 'data';
  adID: any;
  adDetails: any = [];
  slides: any[] = [];
  imgs: any[] = [];
  map: Leaflet.Map;
  favoriIcon: string;
  favorites: string[] = [];
  favData = { favorites: [], token: '', user_id: '' };
  type: string;

  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private photoViewer: PhotoViewer,
    private service: ServiceService,
    private clipboard: Clipboard,
    private router: Router,
    private msgService: MessageService,
    private alertCtrl: AlertController
    ) {
    this.adID = this.activatedRoute.snapshot.paramMap.get('id');

    this.api.getData('ilan/' + this.adID).then((result) => {
      this.adDetails = result;
      this.type = this.adDetails.type;
      console.log(this.adDetails);
      if (this.adDetails.imgs > 0) {
        for (let i = 1; i <= this.adDetails.imgs; i++) {
          this.slides.push({ url: 'https://ananasjam.com/donem/files/images/ilanlar/' + this.adID + '/' + i + '.jpg' });
          this.imgs.push(i);
        }
      } else {
        this.slides.push('https://ananasjam.com/donem/files/images/thumb.jpg');
        // this.imgs.push('thumb');
      }
    });

    if (this.api.isLogin) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
      this.favData.token = this.api.userData.auth_key;
      this.favData.user_id = this.api.userData.user_id;
      if (this.favorites.indexOf(this.adID) !== -1) {
        this.favoriIcon = 'heart';
      } else {
        this.favoriIcon = 'heart-outline';
      }
    } else {
      this.favoriIcon = 'heart-outline';
    }
  }

  ngOnInit() {
  }

  goMsg() {
    if (this.api.isLogin) {
      const msgData = {
        to_id: this.adDetails.user_id,
        ad_id: this.adID,
        ad_title: this.adDetails.title,
        name: this.adDetails.name + ' ' + this.adDetails.surname
      };
      this.msgService.setData(msgData);
      this.router.navigate(['/msg']);
    } else {
      this.service.presentToast('Mesaj gönderebilmek için giriş yapmanız gerekiyor.', 'top');
    }
  }

  loadMap() {
    this.content.scrollToBottom(800);
    this.leafletMap();
  }

  leafletMap() {
    let coords = new Array();
    coords = this.adDetails.location.split(',');
    this.map = Leaflet.map('map', { attributionControl: false });
    Leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(this.map);
    setTimeout(() => {
      this.map.setView([coords[0], coords[1]], 15.5);
    }, 200);
    // this.map.attributionControl.setPrefix('<a href="https://ananasjam.com">ananasjam.com</a> © Ananas Jam');

    const pin = Leaflet.icon({
      iconUrl: '../assets/pin.png',

      iconSize: [48, 48], // size of the icon
      // iconAnchor: [48, 48], // point of the icon which will correspond to marker's location
      // popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    const markPoint = Leaflet.marker([coords[0], coords[1]], { icon: pin });
    markPoint.bindPopup('<p>' + this.adDetails.title + '</p>');
    this.map.addLayer(markPoint);
    // markPoint.openPopup();
  }

  favori() {
    if (this.api.isLogin) {
      if (this.favoriIcon === 'heart') {
        this.favoriIcon = 'heart-outline';
        this.favorites.splice(this.favorites.indexOf(this.adID), 1);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.favData.favorites = this.favorites;
        this.service.presentToast('İlan favorilerden çıkartıldı', 'bottom');
        this.api.postData(this.favData, 'favori').then((result) => {
          console.log(result);
        }, (err) => {

        });
      } else {
        this.favoriIcon = 'heart';
        this.favorites.push(this.adID);
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.favData.favorites = this.favorites;
        this.service.presentToast('İlan favorilere eklendi', 'bottom');
        this.api.postData(this.favData, 'favori').then((result) => {
          console.log(result);
        }, (err) => {

        });
      }
    } else {
      this.service.presentToast('İlanı favorilere ekleyebilmek için giriş yapmanız gerekiyor.', 'top');
    }

  }

  viewimage(img: string) {
    this.photoViewer.show(img);
  }

  ilanNoCopy() {
    this.clipboard.copy(this.adID);
    this.service.presentToast('İlan numarası panoya kopyalandı.', 'top');
  }

  async phone() {
    const title = this.adDetails.name + ' ' + this.adDetails.surname;
    const prompt = await this.alertCtrl.create({
      header: title,
      message: '0' + this.adDetails.phone,
      buttons: [
        {
          text: 'Kapat',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Kopyala',
          handler: data => {
            this.clipboard.copy('0' + this.adDetails.phone);
            this.service.presentToast('Telefon numarası panoya kopyalandı.', 'top');
          }
        }
      ]
    });
    await prompt.present();
  }

  timeConverter(time) {
    const a = new Date(time * 1000);
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const month = months[a.getMonth()];
    const date = a.getDate();
    return date + ' ' + month;
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}
