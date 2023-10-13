import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllShopsPage } from './all-shops.page';

const routes: Routes = [
  {
    path: '',
    component: AllShopsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllShopsPageRoutingModule {}
