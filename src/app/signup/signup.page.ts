import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  keybControl = true;

  constructor(private keyboard: Keyboard) {
    window.addEventListener('keyboardWillShow', (event) => {
      this.keybControl = false;
    });
    window.addEventListener('keyboardWillHide', (event) => {
      this.keybControl = true;
    });
  }

  ngOnInit() {
  }

}
