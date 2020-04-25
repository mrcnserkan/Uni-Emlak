import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  keybControl = true;
  userData  = {email: '', password: ''};
  responseData: any;

  constructor(
    private keyboard: Keyboard,
    private api: ApiService,
    private toastCtrl: ToastController,
    private router: Router
    ) {
    window.addEventListener('keyboardWillShow', (event) => {
      this.keybControl = false;
    });
    window.addEventListener('keyboardWillHide', (event) => {
      this.keybControl = true;
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.userData.email && this.userData.password) {
      if (this.validateEmail(this.userData.email) || this.validatePhoneNumber(this.userData.email)) {
        // this.common.presentLoading("");
        this.api.postData(this.userData, 'login').then((result) => {
          this.responseData = result;
          // console.log(result);
          if (this.responseData.userData) {
            localStorage.setItem('userData', JSON.stringify(this.responseData));
            const data = JSON.parse(localStorage.getItem('userData'));
            this.api.userData = data.userData;
            this.api.isLogin = true;
            // localStorage.setItem('favorites', this.responseData.favorites);
            localStorage.setItem('notif', 'true');
            // this.oneSignal.sendTag("user_id", this.resposeData.userData.user_id);
            this.goHome();
            this.presentToast('Başarıyla Giriş Yaptınız.');
          } else if (this.responseData.error === 'Onaysız hesap') {
            // this.common.closeLoading();
            this.presentToast('Hesabınız onaylı değil. Gerekli onay bağlantısı kayıt olduğunuzda e-mail adresinize gönderilmiştir.');
          } else {
            // this.common.closeLoading();
            this.presentToast('Giriş bilgileri hatalı.');
          }

        }, (err) => {
          // this.common.closeLoading();
          this.presentToast('Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
        });
      } else {
        this.presentToast('Lütfen geçerli bir e-mail adresi veya telefon numarası giriniz.');
      }
    } else {
      this.presentToast('Lütfen boş alan bırakmayınız.');
    }

  }

  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePhoneNumber(phone) {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(phone);
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
