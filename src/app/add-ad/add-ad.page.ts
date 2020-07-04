import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.page.html',
  styleUrls: ['./add-ad.page.scss'],
})
export class AddAdPage implements OnInit {

  constructor(private service: ServiceService) { }

  ngOnInit() {
  }

  pushAdType(adType) {
    this.service.adtype = adType;
  }

}
