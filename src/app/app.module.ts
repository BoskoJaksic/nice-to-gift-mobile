import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from '@ionic/storage-angular';
import {AuthInterceptor} from "./core/auth.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoaderService} from "./shared/services/loader.service";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, CommonModule,
    BrowserAnimationsModule,
    HttpClientModule, SharedModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    LoaderService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
