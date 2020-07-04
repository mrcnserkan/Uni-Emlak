import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ApiService } from '../services/api.service';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  responseData: any;
  address = {town: '', province: ''};
  location = false;

  catSlideOpts = {
    slidesPerView: 2.3,
    initialSlide: 0,
    freeMode: true
  };

  oneCikanSlideOpts = {
    slidesPerView: 1.3,
    initialSlide: 0,
    freeMode: true
  };

  constructor(private geolocation: Geolocation, private api: ApiService, private service: ServiceService) { }

  ngOnInit() {
    if (localStorage.getItem('location')) {
      this.address = JSON.parse(localStorage.getItem('location'));
      this.location = true;
    }
  }

  getLocation() {
    if (localStorage.getItem('location')) {
      this.address = JSON.parse(localStorage.getItem('location'));
      this.location = true;
    } else {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.api.geocoding(resp.coords.latitude, resp.coords.longitude).then((result) => {
          this.responseData = result;
          this.address = this.responseData.address;
          if (!this.address.town) {
            this.address.town = this.responseData.address.county;
          }
          this.location = true;
          localStorage.setItem('location', JSON.stringify(this.address));
          // console.log(this.responseData);
        }, (err) => {
          console.log(err);
          this.location = false;
        });
      }).catch((error) => {
        if (localStorage.getItem('location')) {
          this.address = JSON.parse(localStorage.getItem('location'));
          this.location = true;
        } else {
          this.location = false;
        }
        console.log('Error getting location', error);
      });
    }
  }

  pushAdType(adType) {
    this.service.adtype = adType;
  }

}
