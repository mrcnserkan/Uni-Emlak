import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: string[];
  favs: any = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.favorites = JSON.parse(localStorage.getItem('favorites'));
    this.getFavs();
  }


  getFavs() {
    this.api.postData(this.api.userData, 'favoriGet').then((result) => {
      this.favs = result;
      console.log(result);
    });
  }

  goAd(adID: any) {
    this.router.navigate(['/ad-detail/' + adID]);
  }

}
