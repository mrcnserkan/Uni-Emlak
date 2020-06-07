import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'add-ad',
    loadChildren: () => import('./add-ad/add-ad.module').then( m => m.AddAdPageModule)
  },
  {
    path: 'add-ad-shand',
    loadChildren: () => import('./add-ad-shand/add-ad-shand.module').then( m => m.AddAdShandPageModule)
  },
  {
    path: 'ads-shand',
    loadChildren: () => import('./ads-shand/ads-shand.module').then( m => m.AdsShandPageModule)
  },
  {
    path: 'ad-detail/:id',
    loadChildren: () => import('./ad-detail/ad-detail.module').then( m => m.AdDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
