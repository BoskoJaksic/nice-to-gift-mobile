import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import {RouterLink, RouterOutlet} from "@angular/router";
import {IonicModule} from "@ionic/angular";

@NgModule({
  imports: [
    FormsModule,
    TabsPageRoutingModule,
    RouterLink,
    IonicModule,
    CommonModule,
    RouterOutlet],
  exports: [
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
