import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  MAIN_API_URL = 'https://ananasjam.com/donem/api/';

  isLogin = false;
  userData: any;

  constructor(private http: HttpClient) {}

  postData(credentials, type) {

    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      this.http.post(this.MAIN_API_URL + type, JSON.stringify(credentials), httpOptions).
        subscribe(res => {
          resolve(res);
        },
        (err) => {
          reject(err);
        });

    });

  }

  getData(type) {
    return new Promise((resolve, reject) => {
      this.http.get(this.MAIN_API_URL + type).
        subscribe(res => {
          resolve(res);
        },
          (err) => {
          reject(err);
        });

    });
  }

  geocoding(lat, lon) {
    return new Promise((resolve, reject) => {
      this.http.get('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lon + '&zoom=18&addressdetails=1').subscribe(res => {
        resolve(res);
      },
        (err) => {
          reject(err);
        });
    });
  }

}
