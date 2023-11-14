import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiftDetailsPage } from './gift-details.page';

const routes: Routes = [
  {
    path: '',
    component: GiftDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiftDetailsPageRoutingModule {}
