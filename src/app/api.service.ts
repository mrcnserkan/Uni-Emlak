import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  apiUrl = 'http://localhost/donem/api/';
  isLogin = false;
  userData;

  constructor(private http: HttpClient) {}

  postData(credentials, type) {

    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      };
      this.http.post(this.apiUrl + type, JSON.stringify(credentials), httpOptions).
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
      this.http.get(this.apiUrl + type).
        subscribe(res => {
          resolve(res);
        },
          (err) => {
          reject(err);
        });

    });
  }

}
