import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ServiceService } from '../services/service.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.page.html',
  styleUrls: ['./ad-detail.page.scss'],
})
export class AdDetailPage implements OnInit {

  segment = 'data';
  adID: any;
  adDetails: any = [];
  slides: any[] = [];
  imgs: any[] = [];

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private photoViewer: PhotoViewer, private service: ServiceService, private clipboard: Clipboard) {
    this.adID = this.activatedRoute.snapshot.paramMap.get('id');

    this.api.getData('ilan/' + this.adID).then((result) => {
      this.adDetails = result;
      console.log(this.adDetails);
      if (this.adDetails.imgs > 0) {
        for (let i = 1; i <= this.adDetails.imgs; i++) {
          this.slides.push({ url: 'https://ananasjam.com/donem/files/images/ilanlar/' + this.adID + '/' + i + '.jpg' });
          this.imgs.push(i);
        }
      } else {
        this.slides.push('https://ananasjam.com/donem/files/images/thumb.svg');
        this.imgs.push('thumb');
      }
    });
  }

  ngOnInit() {
  }

  viewimage(img: string) {
    this.photoViewer.show(img);
  }

  ilanNoCopy() {
    this.clipboard.copy(this.adID);
    this.service.presentToast('İlan numarası panoya kopyalandı.', 'top');
  }

  timeConverter(time) {
    const a = new Date(time * 1000);
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const month = months[a.getMonth()];
    const date = a.getDate();
    return date + ' ' + month;
  }

}
