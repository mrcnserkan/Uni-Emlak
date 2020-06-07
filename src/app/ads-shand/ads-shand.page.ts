import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ads-shand',
  templateUrl: './ads-shand.page.html',
  styleUrls: ['./ads-shand.page.scss'],
})
export class AdsShandPage implements OnInit {

  page = 1;
  max: number;
  adDetails = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.load();
  }


  load(infiniteScroll?) {
    this.api.getData('ilan/page/' + this.page).then((result) => {
      this.adDetails = this.adDetails.concat(result);
      // console.log(this.adDetails);
      this.max = this.adDetails[0].lastPage;
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
    });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.load(infiniteScroll);
    if (this.page === this.max) {
      infiniteScroll.enable(false);
    }
    // console.log(this.adDetails);
  }

  goAd(adID: any) {
    this.router.navigate(['/ad-detail/' + adID]);
  }

}
