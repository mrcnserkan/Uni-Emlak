import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public loader: any;
  public isLoading = false;

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
    ) { }

  async presentToast(msg, pos, dur = 2) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: dur * 1000,
      position: pos
    });
    toast.present();
  }

  async presentAlert(hedaer = '', subhedaer = '', msg = '') {
    const alert = await this.alertCtrl.create({
      header: hedaer,
      subHeader: subhedaer,
      message: msg,
      buttons: ['Tamam']
    });
    await alert.present();
  }

  async presentLoading(msg = 'Lütfen bekleyiniz...') {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: msg,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async closeLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss();
  }
}
