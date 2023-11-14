import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileTabPage } from './profile-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileTabPage
  },
  {
    path: 'gift-details/:imgSrc',
    loadChildren: () => import('./gift-details/gift-details.module').then( m => m.GiftDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileTabPageRoutingModule {}
