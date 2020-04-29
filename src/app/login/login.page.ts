import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

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
    private api: ApiService,
    private router: Router,
    private service: ServiceService
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
        this.service.presentLoading();
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
            this.service.closeLoading();
            this.service.presentToast('Başarıyla giriş yaptınız.', 'bottom');
            this.goHome();
          } else if (this.responseData.error === 'Onaysız hesap') {
            this.service.closeLoading();
            // tslint:disable-next-line:max-line-length
            this.service.presentToast('Hesabınız onaylı değil. Gerekli onay bağlantısı kayıt olduğunuzda e-posta adresinize gönderilmiştir.', 'top', 3);
          } else {
            this.service.closeLoading();
            this.service.presentToast('Giriş bilgileri hatalı.', 'top');
          }

        }, (err) => {
          this.service.closeLoading();
          this.service.presentToast('Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.', 'top');
        });
      } else {
        this.service.presentToast('Lütfen geçerli bir e-posta adresi veya telefon numarası giriniz.', 'top');
      }
    } else {
      this.service.presentToast('Lütfen boş alan bırakmayınız.', 'top');
    }

  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePhoneNumber(phone) {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(phone);
  }

  goHome() {
    this.router.navigate(['/']);
  }

}
