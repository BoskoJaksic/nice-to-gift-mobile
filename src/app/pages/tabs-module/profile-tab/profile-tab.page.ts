import {Component, OnInit} from '@angular/core';
import {UserApiServices} from "../../../shared/services/user.api.services";
import {StorageService} from "../../../shared/services/storage.service";
import {LoaderService} from "../../../shared/services/loader.service";
import {ActivatedRoute} from "@angular/router";
import {OrdersApiService} from "../../../shared/services/orders-api.service";
import {ToasterService} from "../../../shared/services/toaster.service";

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {
  avatarImg: string | undefined;
  userName: string = '';
  surname: string = '';
  givenOrders: any;
  receivedOrders: any;


  constructor(private userApiServices: UserApiServices,
              private loaderService: LoaderService,
              private ordersApiService: OrdersApiService,
              private toasterService: ToasterService,
              private route: ActivatedRoute,
              private storageService: StorageService,) {
    this.avatarImg = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  }


  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.loaderService.showLoader();
      const paramId = params['id'];
      console.log('iddd', paramId)
      if (paramId !== 'false') {
        await this.updateReceiver(paramId)
      }
      await this.getUsersData();
      await this.getGivenOrders();
      await this.getReceivedOrders();
      this.loaderService.hideLoader();

    })
  }

  async getUsersData() {
    let userId = await this.storageService.getItem('userId')
    this.userApiServices.getUsersData(userId).subscribe(r => {
      if (r.base64Image){
        this.avatarImg = r.base64Image
      }
      this.userName = r.name
      this.surname = r.surname
    })
  }

  async updateReceiver(orderId: any) {
    this.loaderService.showLoader();
    let receiver = await this.storageService.getItem('userEmail')
    let dataToSend = {
      orderId: orderId,
      receiverEmail: receiver
    }
    this.ordersApiService.updateOrderReceiver(dataToSend).subscribe({
      next: async (r) => {
        await this.getReceivedOrders();
        this.loaderService.hideLoader();
        await this.toasterService.presentToast('Gift successfully received', 'success')
      }, error: (err) => {
        this.loaderService.hideLoader();
        this.toasterService.presentToast('Something went wrong while receiving gift', 'danger')
      }
    })
  }

  async getGivenOrders() {
    let senderId = await this.storageService.getItem('userId')
    this.ordersApiService.getGivenOrders(senderId).subscribe({
      next: (r) => {
        this.givenOrders = r.data
      }, error: (err) => {
        this.toasterService.presentToast('Something went wrong', 'danger')
      }
    })
  }

  async getReceivedOrders() {
    let senderId = await this.storageService.getItem('userId')
    this.ordersApiService.getReceivedOrders(senderId).subscribe({
      next: (r) => {
        this.receivedOrders = r.data
      }, error: (err) => {
        this.toasterService.presentToast('Something went wrong', 'error')
      }
    })
  }

}
