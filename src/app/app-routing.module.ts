import {NgModule} from '@angular/core';
import {ExtraOptions, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./core/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'login-register',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'on-boarding',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/on-boarding/on-boarding.module').then(m => m.OnBoardingPageModule)
  },
  {
    path: 'tabs',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tabs-module/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'get-started',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/get-started/get-started.module').then(m => m.GetStartedPageModule)
  },
  {
    path: 'all-shops',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/all-shops/all-shops.module').then(m => m.AllShopsPageModule)
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/home-tab',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
