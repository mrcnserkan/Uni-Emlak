import {Component, OnInit, ViewChild, NgZone, ViewChildren} from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ServiceService } from '../services/service.service';
import { ApiService } from '../services/api.service';
import { IonSlides, Platform } from '@ionic/angular';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-ad-shand',
  templateUrl: './add-ad-shand.page.html',
  styleUrls: ['./add-ad-shand.page.scss'],
})
export class AddAdShandPage implements OnInit {

  keybControl = true;
  @ViewChild('slides', { static: false }) slides: IonSlides;
  ad = { user_id: '', title: '', description: '', phonevis: true, city: '', district: '', nhood: '', street: '', doornum: '', price: '', imgs: '', token: '' };
  images: string[] = [];
  responseData: any;

  constructor(
    private platform: Platform,
    private zone: NgZone,
    private camera: Camera,
    private service: ServiceService,
    private api: ApiService,
    public photoViewer: PhotoViewer,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.ad.user_id = this.api.userData.user_id;
    this.ad.token = this.api.userData.auth_key;

    if (localStorage.getItem('location')) {
      const location = JSON.parse(localStorage.getItem('location'));
      this.ad.city = location.province;
      if (!location.town) {
        this.ad.district = location.county;
      } else {
        this.ad.district = location.town;
      }
      if (location.suburb) {
        this.ad.nhood = location.suburb;
      }
      if (location.road) {
        this.ad.street = location.road;
      }
    }
  }

  sendAd() {
    if (this.ad.title && this.ad.description && this.ad.city && this.ad.district && this.ad.nhood && this.ad.price) {
      this.service.presentLoading('Gönderiliyor, lütfen bekleyiniz...');
      this.api.postData(this.ad, 'ilanUpdate').then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        this.service.closeLoading();
        this.service.presentAlert('İlanınız başarıyla gönderildi', 'Kontrol edildikten sonra bir problem gözükmediği belirlendiğinde ilanınız yayınlanacaktır.');
        this.goHome();
      }, (err) => {
        console.log(err);
        this.service.closeLoading();
        this.service.presentToast('Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.', 'top');
      });
    } else {
      this.service.presentToast('Lütfen zorunlu kısımda boş alan bırakmayınız.', 'top');
    }
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    if (this.images.length < 6) {
      this.service.presentLoading('Fotoğraf ekleniyor...');
      this.camera.getPicture(options).then((imageData) => {
        this.images.push('data:image/jpeg;base64,' + imageData);
        this.ad.imgs = JSON.stringify(this.images);
        this.service.closeLoading();
        this.service.presentToast('Fotoğraf eklendi', 'top');
        // console.log(this.ilanData.imgs);
      }, (err) => {
        this.service.closeLoading();
        // Handle error
      });
    } else {
      this.service.presentToast('En fazla 6 fotoğraf ekleyebilirsiniz.', 'top');
    }
  }

  deleteImg(img: string) {
    const index: number = this.images.indexOf(img);
    if (index !== -1) {
      this.slides.slidePrev();
      this.images.splice(index, 1);
      this.ad.imgs = JSON.stringify(this.images);
      this.service.presentToast('Fotoğraf silindi.', 'top');
    }
  }

  viewimage(img: string) {
    this.photoViewer.show(img);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
