import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../shared/services/storage.service";
import {ShopApiServices} from "../../../shared/services/shop-api.services";
import {ShopModel} from "../../../shared/model/shops/shop.model";
import {LoaderService} from "../../../shared/services/loader.service";
import {ActivatedRoute} from "@angular/router";
import {OrdersApiService} from "../../../shared/services/orders-api.service";
import {DatePipe} from '@angular/common';
import {GeocodingService} from "../../../shared/services/geo.service";
import {Subscription} from "rxjs";
import {AmountService} from "../../../shared/services/ammount.service";
import {LocalStorageService} from "../../../shared/services/local-storage.service";


@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {
  shops: ShopModel[] = [];
  userName:any
  giftData: any;
  daysLeftToPickup: any;
  variable = true;
  distanceToShow:any
  private routeSubscription!: Subscription;

  constructor(private storageService: StorageService,
              private loaderService: LoaderService,
              private route: ActivatedRoute,
              private ordersApiService: OrdersApiService,
              private geocodingService: GeocodingService,
              private datePipe: DatePipe,
              private shopApiServices: ShopApiServices,
              private amountService: AmountService,
              private localStorageService: LocalStorageService,
              private shopApiService: ShopApiServices) {
  }

  async ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(async params => {
      await this.getShops()
      await this.getLastOrUpcoming();
      this.getFeeAmount();
    });
  }

  getFeeAmount() {
    this.shopApiServices.getFeeAmount().subscribe(r => {
      let fee = r.feePercentRate.toString()
      this.amountService.setFeeAmount(fee)
    })
  }

  async calculateDistance() {
    let currenLocation = this.geocodingService.getCoordinates();
    console.log('currenLocation',currenLocation.coords)
    let shopAddress =   this.giftData.street + ' ' + this.giftData.streetNumber + ', ' + this.giftData.postalCode + ' ' + this.giftData.city + ', ' + this.giftData.country
    this.geocodingService.getCoordinatesFromAddress(shopAddress).subscribe(
      (data: any[]) => {
        if (data && data.length > 0) {
          const latitude = data[0].lat;
          const longitude = data[0].lon;
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
          this.distanceToShow = this.geocodingService.calculateDistance(latitude,longitude,currenLocation.coords.latitude,currenLocation.coords.longitude).toFixed(2)
        } else {
          console.error('No coordinates found for the address.');
        }
      },
      error => {
        console.error('Error fetching coordinates:', error);
      }
    );
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
    let receiverId =  this.localStorageService.getUserId()
    this.ordersApiService.getLastOrUpcoming(receiverId).subscribe({
      next: (r) => {
        console.log('last or up', r)
        this.giftData = r
        this.daysLeftToPickup = this.calculateDaysLeft(r?.creationDate, r?.pickupTimeSpan);
        this.calculateDistance()
      }
    })
  }

  async getShops() {
    this.loaderService.showLoader();
    this.userName = this.localStorageService.getUserName()
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
      this.getLastOrUpcoming();
      event.target.complete();
    }, 2000);
  }

  ngOnDestroy() {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
