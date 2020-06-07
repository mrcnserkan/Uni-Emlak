import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAdShandPageRoutingModule } from './add-ad-shand-routing.module';

import { AddAdShandPage } from './add-ad-shand.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAdShandPageRoutingModule
  ],
  declarations: [AddAdShandPage]
})
export class AddAdShandPageModule {}
