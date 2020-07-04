import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private msgData = [];

  constructor() { }

  setData(data) {
    this.msgData = data;
  }

  getData() {
    return this.msgData;
  }
}
