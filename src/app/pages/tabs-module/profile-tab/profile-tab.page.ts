import {Component, OnInit} from '@angular/core';
import {UserApiServices} from "../../../shared/services/user.api.services";
import {LoaderService} from "../../../shared/services/loader.service";
import {ActivatedRoute} from "@angular/router";
import {OrdersApiService} from "../../../shared/services/orders-api.service";
import {ToasterService} from "../../../shared/services/toaster.service";
import {LocalStorageService} from "../../../shared/services/local-storage.service";
import {CommonService} from "../../../services/common.service";

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


  constructor(
    private loaderService: LoaderService,
    private ordersApiService: OrdersApiService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    public userApiServices: UserApiServices,
    public commonService: CommonService,
    private localStorageService: LocalStorageService,
  ) {
    this.avatarImg = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  }


  ngOnInit() {
    this.route.params.subscribe(async params => {
      if (this.userApiServices.isUserLoggedIn()) {
        this.loaderService.showLoader();
        const paramId = params['id'];
        if (paramId !== 'false') {
          await this.updateReceiver(paramId)
        }
        await this.getUsersData();
        await this.getGivenOrders();
        await this.getReceivedOrders();
        setTimeout(() => {
          this.loaderService.hideLoader();
        }, 300)
      }
    })
  }


  async getUsersData() {
    let userId = this.localStorageService.getUserId();
    this.userApiServices.getUsersData(userId).subscribe(r => {
      if (r.base64Image) {
        this.avatarImg = r.base64Image
      }
      this.userName = r.name
      this.surname = r.surname
    })
  }

  async updateReceiver(orderId: any) {
    this.loaderService.showLoader();
    // let receiver =  this.localStorageService.getUserEmail()
    let dataToSend = {
      orderId: orderId,
      receiverEmail: this.localStorageService.getUserEmail()
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
    // let senderId = await this.storageService.getItem('userId')
    let senderId = this.localStorageService.getUserId();

    this.ordersApiService.getGivenOrders(senderId).subscribe({
      next: (r) => {
        this.givenOrders = r.data
      }, error: (err) => {
        this.toasterService.presentToast('Something went wrong', 'danger')
      }
    })
  }

  async getReceivedOrders() {
    // let receiverId = await this.storageService.getItem('userId')
    let receiverId = this.localStorageService.getUserId();

    this.ordersApiService.getReceivedOrders(receiverId).subscribe({
      next: (r) => {
        this.receivedOrders = r.data
      }, error: (err) => {
        this.toasterService.presentToast('Something went wrong', 'error')
      }
    })
  }

}
