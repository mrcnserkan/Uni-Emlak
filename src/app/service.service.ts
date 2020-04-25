import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private toastCtrl: ToastController) { }

  async presentToast(msg, pos, dur) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: dur * 1000,
      position: pos
    });
    toast.present();
  }
}
