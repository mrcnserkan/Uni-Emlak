import { Component, OnInit } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from './services/api.service';
import { ServiceService } from './services/service.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  badgeGet: any;
  badge: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public api: ApiService,
    private service: ServiceService,
    private alertController: AlertController,
    private db: AngularFireDatabase
  ) {
    this.initializeApp();
  }

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Vitrin',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Mesajlar',
      url: '/messages',
      icon: 'chatbubbles'
    },
    {
      title: 'Favoriler',
      url: '/favorites',
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
      this.statusBar.backgroundColorByHexString('#61045F');
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    if (localStorage.getItem('userData')) {
      const data = JSON.parse(localStorage.getItem('userData'));
      this.api.userData = data.userData;
      this.api.isLogin = true;
    } else {
      this.api.isLogin = false;
    }

    if (this.api.isLogin) {
      this.getBadge();
      // tslint:disable-next-line:radix
      this.db.object('/check/' + parseInt(this.api.userData.user_id) + '/status').valueChanges().subscribe(data => {
        // console.log(data);
        if (Boolean(data)) {
          this.getBadge();
          // tslint:disable-next-line:radix
          this.db.object('/check/' + parseInt(this.api.userData.user_id) + '/status').set(false);
        }
      });
    }
  }

  getBadge() {
    this.api.postData(this.api.userData, 'badgeGet').then((result) => {
      this.badgeGet = result;
      // console.log(this.badgeGet);
      if (this.badgeGet.badge) {
        this.badge = this.badgeGet.badge;
      } else {
        // error
      }
    });
  }

  async logoff() {
    if (localStorage.getItem('userData')) {
      const alert = await this.alertController.create({
        header: 'Çıkış',
        message: 'Emin misiniz?',
        mode: 'ios',
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
              localStorage.removeItem('favorites');
              this.api.userData = null;
              this.api.isLogin = false;
              this.service.presentToast('Başarıyla çıkış yaptınız', 'top', 1.1);
            }
          }
        ]
      });

      await alert.present();
    }
  }

}
