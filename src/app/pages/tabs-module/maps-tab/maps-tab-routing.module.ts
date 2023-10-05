import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapsTabPage } from './maps-tab.page';

const routes: Routes = [
  {
    path: '',
    component: MapsTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapsTabPageRoutingModule {}
