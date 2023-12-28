import {Component, Input, OnInit} from '@angular/core';
import {GeocodingService} from "../../shared/services/geo.service";

@Component({
  selector: 'app-maps-details',
  templateUrl: './maps-details.component.html',
  styleUrls: ['./maps-details.component.scss'],
})
export class MapsDetailsComponent implements OnInit {
  @Input() marker: any
  @Input() shops: any
  @Input() currentPosition: any
  distance: any
  workingHours: any;
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  constructor(private geoService: GeocodingService) {
  }

  ngOnInit() {
    const newShopDetails = this.shops.workingHours
    newShopDetails.forEach((item: any) => {
      if (item.day >= 0 && item.day <= 6) {
        item.dayName = this.days[item.day];
      }
      if (item.closingTime !== null) {
        item.closingTime = item.closingTime.slice(0, -3);
      }
      if (item.openingTime !== null) {
        item.openingTime = item.openingTime.slice(0, -3);
      }
    });
    this.workingHours = newShopDetails;
    console.log('marker init', this.marker)
    console.log('shop init', this.shops)
    console.log('currentPosition', this.currentPosition)
    this.distance = this.geoService.calculateDistance(this.marker.latitude, this.marker.longitude, this.currentPosition.lat, this.currentPosition.lng).toFixed(2)
  }

}
