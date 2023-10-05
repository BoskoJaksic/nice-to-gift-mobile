import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiftTabPage } from './gift-tab.page';

const routes: Routes = [
  {
    path: '',
    component: GiftTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiftTabPageRoutingModule {}
