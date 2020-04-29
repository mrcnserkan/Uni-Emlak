import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './api.service';
import { ServiceService } from './service.service';
 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private route: ActivatedRoute,
    private api: ApiService,
    private service: ServiceService,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Vitrin',
      url: '/folder/Vitrin',
      icon: 'home'
    },
    {
      title: 'Mesajlar',
      url: '/folder/Mesajlar',
      icon: 'chatbubbles'
    },
    {
      title: 'Favoriler',
      url: '/folder/Favoriler',
      icon: 'heart'
    },
    {
      title: 'İlanlarım',
      url: '/folder/İlanlarım',
      icon: 'documents'
    },
    {
      title: 'Ayarlar',
      url: '/folder/Ayarlar',
      icon: 'settings'
    },
    {
      title: 'Administrator',
      url: '/folder/Administrator',
      icon: 'code-slash'
    }
  ];

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#2c023d');
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    if (localStorage.getItem('userData')){
      const data = JSON.parse(localStorage.getItem('userData'));
      this.api.userData = data.userData;
      this.api.isLogin = true;
    } else {
      this.api.isLogin = false;
    }
  }

  async logoff() {
    if (localStorage.getItem('userData')) {
      const alert = await this.alertController.create({
        header: 'Çıkış',
        message: 'Emin misiniz?',
        buttons: [
          {
            text: 'Vazgeç',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              // console.log('Cancel');
            }
          }, {
            text: 'Evet',
            handler: () => {
              localStorage.removeItem('userData');
              localStorage.removeItem('notif');
              this.api.userData = null;
              this.api.isLogin = false;
              this.service.presentToast('Başarıyla çıkış yaptınız', 'bottom', 1.5);
            }
          }
        ]
      });

      await alert.present();
    }
  }

}
