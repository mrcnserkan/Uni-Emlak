import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdsShandPage } from './ads-shand.page';

const routes: Routes = [
  {
    path: '',
    component: AdsShandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdsShandPageRoutingModule {}
