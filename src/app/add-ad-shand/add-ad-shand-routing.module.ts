import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAdShandPage } from './add-ad-shand.page';

const routes: Routes = [
  {
    path: '',
    component: AddAdShandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAdShandPageRoutingModule {}
