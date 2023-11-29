import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../shared/services/storage.service";
import {ShopApiServices} from "../../../shared/services/shop-api.services";
import {ShopModel} from "../../../shared/model/shops/shop.model";
import {LoaderService} from "../../../shared/services/loader.service";
import {ActivatedRoute} from "@angular/router";
import {OrdersApiService} from "../../../shared/services/orders-api.service";
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {
  shops: ShopModel[] = [];
  userName: string = ''
  giftData: any;
  daysLeftToPickup: any;
  variable = false;
  constructor(private storageService: StorageService,
              private loaderService: LoaderService,
              private route: ActivatedRoute,
              private ordersApiService: OrdersApiService,
              private datePipe: DatePipe,
              private shopApiService: ShopApiServices) {
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      await this.getShops()
      await this.getLastOrUpcoming();
    });
  }

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    const transformedDate = this.datePipe.transform(date, 'EEE dd MMM');
    return transformedDate ? transformedDate.toUpperCase() : '';
  }

   calculateDaysLeft(creationDate: string, pickupTimeSpan: string): number {
    const currentDate = new Date(); // Trenutni datum i vreme
    const createdDate = new Date(creationDate); // Datum kada je kreiran objekat

    const [days] = pickupTimeSpan.split('.'); // Dobijanje broja dana iz pickupTimeSpan

    // Dodavanje pickupTimeSpan dana na datum kreiranja
    const expirationDate = new Date(createdDate.getTime() + parseInt(days) * 24 * 60 * 60 * 1000);

    // Računanje razlike između trenutnog datuma i datuma isteka
    const differenceInTime = expirationDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays >= 0 ? differenceInDays : 0; // Provera ako je razlika manja od nula
  }

  async getLastOrUpcoming() {
    let receiverId = await this.storageService.getItem('userId')
    this.ordersApiService.getLastOrUpcoming(receiverId).subscribe({
      next: (r) => {
        console.log('last or up', r)
        this.giftData = r
        this.daysLeftToPickup = this.calculateDaysLeft(r?.creationDate, r?.pickupTimeSpan)
      }
    })
  }

  async getShops() {
    this.loaderService.showLoader();
    this.userName = await this.storageService.getItem('userName')
    this.shopApiService.get10Shops().subscribe(
      (shops: any) => {
        this.shops = shops.data
        console.log(shops);
        this.loaderService.hideLoader();
      },
      (error: any) => {
        console.error(error);
        this.loaderService.hideLoader();
      }
    );
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getShops()
      event.target.complete();
    }, 2000);
  }
}
