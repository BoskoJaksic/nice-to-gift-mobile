import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CommonService} from "../../../../services/common.service";
import {Share} from "@capacitor/share";
import {OrdersApiService} from "../../../../shared/services/orders-api.service";
import {LoaderService} from "../../../../shared/services/loader.service";

@Component({
  selector: 'app-gift-details',
  templateUrl: './gift-details.page.html',
  styleUrls: ['./gift-details.page.scss'],
})
export class GiftDetailsPage implements OnInit {
  orderId = ''
  orderDetails: any
  textColorClass: string = '';

  constructor(private route: ActivatedRoute,
              public commonService: CommonService,
              public ordersApiService: OrdersApiService,
              private loaderService: LoaderService,
              private renderer: Renderer2, private el: ElementRef
  ) {
  }

  async shareLInk() {
    await Share.share({
      text: this.orderDetails.receiverComment,
      url: `https://orange-grass-0aed0ab03.4.azurestaticapps.net/tabs/tabs/profile-tab/${this.orderId}`,
      dialogTitle: 'Nice To Gift',
    });
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      // @ts-ignore
      this.orderId = params['orderId'];
      this.getGiftDetails();
      console.log('get metoda za gift details ide ovdje');
    })
  }

  calculateImgBg() {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = this.orderDetails?.shopImageUri;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = image.width;
      canvas.height = image.height;
      ctx!.drawImage(image, 0, 0, canvas.width, canvas.height);

      const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let totalR = 0,
        totalG = 0,
        totalB = 0;

      for (let i = 0; i < data.length; i += 4) {
        totalR += data[i];
        totalG += data[i + 1];
        totalB += data[i + 2];
      }

      const avgR = totalR / (data.length / 4);
      const avgG = totalG / (data.length / 4);
      const avgB = totalB / (data.length / 4);

      const brightness = (avgR * 299 + avgG * 587 + avgB * 114) / 1000;

      this.textColorClass = brightness > 125 ? 'dark-text' : 'light-text';
    };
  }

  getGiftDetails() {
    this.loaderService.showLoader();
    this.ordersApiService.getSingleOrder(this.orderId).subscribe({
      next: (r) => {
        console.log('single order details', r)
        this.orderDetails = r
        const imageSrc = this.orderDetails?.shopImageUri;
        this.getImageBrightness(imageSrc, (brightness) => {
          this.textColorClass = brightness > 125 ? 'dark-text' : 'light-text';
        });
        this.loaderService.hideLoader()
      }, error: (err) => {
        this.loaderService.hideLoader()
      }
    })
  }

  getImageBrightness(imageSrc: string, callback: (brightness: number) => void) {
    const img = new Image();
    img.src = imageSrc;
    img.style.display = 'none';
    document.body.appendChild(img);

    let colorSum = 0;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width || 0; // Dodavanje || 0 kako bi se izbegle greške
      canvas.height = img.height || 0; // Dodavanje || 0 kako bi se izbegle greške

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData?.data;
      let r, g, b, avg;

      if (data) {
        for (let x = 0, len = data.length; x < len; x += 4) {
          r = data[x];
          g = data[x + 1];
          b = data[x + 2];

          avg = Math.floor((r + g + b) / 3);
          colorSum += avg;
        }

        const brightness = Math.floor(colorSum / (canvas.width * canvas.height));
        callback(brightness);
      }
    };

    img.onerror = (error) => {
      console.error('Error loading image:', error);
      // Handle error if image fails to load
    };
  }
}
