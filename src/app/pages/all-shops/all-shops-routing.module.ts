import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AllShopsPage} from './all-shops.page';

const routes: Routes = [
  {
    path: '',
    component: AllShopsPage
  },
  {
    path: 'single-shop-view/:id',
    loadChildren: () => import('./single-shop-view/single-shop-view.module').then(m => m.SingleShopViewPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllShopsPageRoutingModule {
}
