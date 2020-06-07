import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdsShandPageRoutingModule } from './ads-shand-routing.module';

import { AdsShandPage } from './ads-shand.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdsShandPageRoutingModule
  ],
  declarations: [AdsShandPage]
})
export class AdsShandPageModule {}
