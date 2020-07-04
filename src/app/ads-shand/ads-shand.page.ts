import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-ads-shand',
  templateUrl: './ads-shand.page.html',
  styleUrls: ['./ads-shand.page.scss'],
})
export class AdsShandPage implements OnInit {

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  page = 1;
  max: number;
  adDetails = [];
  type: string;
  isNull = true;

  constructor(private api: ApiService, private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.type = this.service.adtype;
    this.load();
  }


  load(infiniteScroll?) {
    this.api.getData('ilan/' + this.type + '/' + this.page).then((result) => {
      this.adDetails = this.adDetails.concat(result);
      if (this.adDetails[0][1]) {
        this.isNull = false;
      }
      // console.log(this.adDetails);
      this.max = this.adDetails[0].lastPage;
      if (infiniteScroll) {
        infiniteScroll.target.complete();
      }
    });
  }

  doInfinite(infiniteScroll) {
    if (this.page === this.max) {
      infiniteScroll.target.disabled = true;
    } else {
      this.page++;
      this.load(infiniteScroll);
    }
    // console.log(this.adDetails);
  }

  goAd(adID: any) {
    this.router.navigate(['/ad-detail/' + adID]);
  }

}
