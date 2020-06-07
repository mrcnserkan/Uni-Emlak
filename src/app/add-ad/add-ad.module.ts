import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAdPageRoutingModule } from './add-ad-routing.module';

import { AddAdPage } from './add-ad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAdPageRoutingModule
  ],
  declarations: [AddAdPage]
})
export class AddAdPageModule {}
