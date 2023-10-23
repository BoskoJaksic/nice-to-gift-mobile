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
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutPageModule)
  },
  {
    path: 'payment-method',
    loadChildren: () => import('./payment-method/payment-method.module').then( m => m.PaymentMethodPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllShopsPageRoutingModule {
}
