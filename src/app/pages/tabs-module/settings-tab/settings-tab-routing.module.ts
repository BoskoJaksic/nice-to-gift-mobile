import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsTabPage } from './settings-tab.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsTabPage
  },
  {
    path: 'payment-method-list',
    loadChildren: () => import('./payment-method-list/payment-method-list.module').then( m => m.PaymentMethodListPageModule)
  },
  {
    path: 'add-payment-method',
    loadChildren: () => import('./add-payment-method/add-payment-method.module').then( m => m.AddPaymentMethodPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsTabPageRoutingModule {}
