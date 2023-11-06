import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentMethodListPage } from './payment-method-list.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentMethodListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentMethodListPageRoutingModule {}
