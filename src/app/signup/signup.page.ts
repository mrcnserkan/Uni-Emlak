import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  keybControl = true;
  responseData: any;
  userData = { name: '', surname: '', email: '', phone: '', password: ''};
  password2 = '';

  constructor(
    private api: ApiService,
    private service: ServiceService,
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

  signup() {
    if (this.userData.name && this.userData.surname && this.userData.email && this.userData.phone && this.userData.password && this.password2) {
      if (!this.validateEmail(this.userData.email)) {
        this.service.presentToast('Lütfen geçerli bir e-posta adresi giriniz', 'top');
      } else if (!this.validatePhoneNumber(this.userData.phone)) {
        this.service.presentToast('Lütfen geçerli bir telefon numarası giriniz', 'top');
      } else if (this.userData.phone.length !== 10) {
        this.service.presentToast('Lütfen telefon numaranızı başında 0 olmadan 10 haneli olarak giriniz', 'top');
      } else if (this.userData.password.length < 6) {
        this.service.presentToast('Şifreniz en az 6 karakter olmalı', 'top');
      } else if (this.userData.password !== this.password2) {
        this.service.presentToast('Şifreler birbiriyle eşleşmiyor', 'top');
      } else {
        this.service.presentLoading();
        this.api.postData(this.userData, 'signup').then(result => {
          this.responseData = result;
          if (this.responseData.userData) {
            this.goHome();
            this.service.closeLoading();
            this.service.presentAlert('Başarılı', '', 'E-posta adresinize onay postası gönderildi. Onayladıktan sonra giriş yapabilirsiniz');
          } else if (this.responseData.error === 'Kayıtlı hesap') {
            this.service.closeLoading();
            this.service.presentToast('Bu e-posta veya telefon numarası zaten kayıtlı', 'top');
          } else {
            this.service.closeLoading();
            this.service.presentToast('Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz', 'top');
          }
        });
      }
    } else {
      this.service.presentToast('Lütfen boş alan bırakmayınız', 'top');
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
