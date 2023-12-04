import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from '@ionic/storage-angular';
import {AuthInterceptor} from "./core/auth.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoaderService} from "./shared/services/loader.service";
import {SharedModule} from "./shared/shared.module";
import {WebViewComponent} from "./components/web-view/web-view.component";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent, WebViewComponent],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, CommonModule,
    BrowserAnimationsModule,
    HttpClientModule, SharedModule, NgOptimizedImage],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    LoaderService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
