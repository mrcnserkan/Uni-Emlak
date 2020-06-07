import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  adDetails = [];

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    switch (this.activatedRoute.snapshot.paramMap.get('id')) {
      case 'Vitrin':
        this.folder = 'Vitrin';
        break;
      default:
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
        break;
    }


    if (this.folder === 'İlanlarım') {
      this.api.getData('ilan/user/' + this.api.userData.user_id).then((result) => {
        this.adDetails = this.adDetails.concat(result);
      });
    }
  }

  goAd(adID: any) {
    this.router.navigate(['/ad-detail/' + adID]);
  }

}
