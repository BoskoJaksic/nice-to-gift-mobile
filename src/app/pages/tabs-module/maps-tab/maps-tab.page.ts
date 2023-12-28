import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {GoogleMap} from "@capacitor/google-maps";
import {environment} from "../../../../environments/environment";
import {ModalController} from "@ionic/angular";
import {MapsDetailsComponent} from "../../../components/maps-details/maps-details.component";
import {ShopApiServices} from "../../../shared/services/shop-api.services";
import {MapMarkerModel} from "../../../shared/model/map-marker.model";
import {LoaderService} from "../../../shared/services/loader.service";
import {Geolocation} from "@capacitor/geolocation";
import {ToasterService} from "../../../shared/services/toaster.service";

@Component({
  selector: 'app-maps-tab',
  templateUrl: './maps-tab.page.html',
  styleUrls: ['./maps-tab.page.scss'],
})
export class MapsTabPage implements OnInit {
  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  markers: MapMarkerModel[] = [];
  allShops: any
  currentPosition: any


  constructor(public commonService: CommonService,
              private modalCtrl: ModalController,
              private loaderService: LoaderService,
              private toasterService: ToasterService,
              private shopApiServices: ShopApiServices
  ) {
  }

  ngOnInit() {

  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentPosition = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    }
  }

  async ionViewWillEnter() {
    try {
      this.loaderService.showLoader();
      const checkPermission = await Geolocation.checkPermissions();
      if (checkPermission.location === 'granted') {
        await this.getCurrentPosition();
        this.getShops();
      } else {
        const requestPermission = await Geolocation.requestPermissions();
        if (requestPermission.location === 'granted') {
          await this.getCurrentPosition();
          this.getShops();
        } else {
          this.commonService.goToRoute('tabs/tabs/home-tab')
          this.loaderService.hideLoader();
          await this.toasterService.presentToast('We need access to your location in order to access maps', 'warning')
        }
      }
    } catch (e:any) {
      if (e.message === 'Location services are not enabled'){
        this.commonService.goToRoute('tabs/tabs/home-tab')
        this.loaderService.hideLoader();
        await this.toasterService.presentToast('Please turn on your location', 'warning')
      }
    }
  }


  getShops() {
    this.shopApiServices.getAllShopsUnfiltered().subscribe({
      next: async (r) => {
        this.allShops = r.data;
        r.data.forEach((r: any) => {
          const marker: MapMarkerModel = {
            title: r.name,
            snippet: r.streetNumber + ' ' + r.street,
            iconUrl: 'assets/icon/marker.png',
            iconSize: {
              width: 35,
              height: 35
            },
            coordinate: {
              lat: r.location.latitude,
              lng: r.location.longitude
            },
          };
          this.markers.push(marker);
        });
        await this.createMap()
      }, error: (err) => {
        this.loaderService.hideLoader();

      }
    })

  }

  async createMap() {
    try {
      this.newMap = await GoogleMap.create({
        id: 'my-cool-map',
        element: this.mapRef.nativeElement,
        apiKey: environment.mapsKey,
        config: {
          width: 100,
          height: 100,
          center: this.currentPosition,
          zoom: 10,
        },
        forceCreate: true,
      });
      console.log('Map successfully created:', this.newMap);
      this.loaderService.hideLoader();
      await this.newMap.addMarkers(this.markers);
      await this.newMap.setOnMarkerClickListener(async (marker) => {
        // @ts-ignore
        let shopToPass = this.allShops.find((s: any) => s.location.latitude === marker.latitude)
        const modal = await this.modalCtrl.create({
          component: MapsDetailsComponent,
          componentProps: {
            marker: marker,
            shops: shopToPass,
            currentPosition: this.currentPosition
          },
          handleBehavior: "cycle",
          initialBreakpoint: 0.25,
          breakpoints: [0, 0.25, 0.75]
        });
        await modal.present();
      })
    } catch (error) {
      this.loaderService.hideLoader();
      console.error('Error creating map:', error);
    }
  }

  ionViewWillLeave() {
    if (this.newMap) {
      this.newMap.destroy();
    }
  }
}
