import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAdPage } from './add-ad.page';

const routes: Routes = [
  {
    path: '',
    component: AddAdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAdPageRoutingModule {}
