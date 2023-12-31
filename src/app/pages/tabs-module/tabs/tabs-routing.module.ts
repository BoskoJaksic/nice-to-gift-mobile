import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home-tab',
        loadChildren: () => import('../home-tab/home-tab.module').then(m => m.HomeTabPageModule)
      },
      {
        path: 'gift-tab',
        loadChildren: () => import('../gift-tab/gift-tab.module').then(m => m.GiftTabPageModule),
        data: { isFromCheckout: false }
      },
      {
        path: 'maps-tab',
        loadChildren: () => import('../maps-tab/maps-tab.module').then(m => m.MapsTabPageModule)
      },
      {
        path: 'profile-tab/:id',
        loadChildren: () => import('../profile-tab/profile-tab.module').then(m => m.ProfileTabPageModule)
      },
      {
        path: 'settings-tab',
        loadChildren: () => import('../settings-tab/settings-tab.module').then(m => m.SettingsTabPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {
}
