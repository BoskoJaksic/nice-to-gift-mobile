import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonService} from "../../services/common.service";
import Swiper from "swiper";
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit, AfterViewInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  classToApply = 'height-50';

  constructor(public commonService: CommonService, platform: Platform) {
    platform.ready().then(() => {
      console.log('Width: ' + platform.width());
      console.log('Height: ' + platform.height());
      console.log('Height: js ' + screen.height);
      // @ts-ignore
      console.log('inner: js ' + parent.innerHeight);

    });
  }

  currentIndex: number = 0;
  slides: any

  ngOnInit() {

    const swiperEl = document.querySelector('swiper-container');
    // @ts-ignore
    this.slides = swiperEl.swiper.slides
  }
  ngAfterViewInit() {
    // this.calculateMarginTop();
  }



  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper
  }

  // shouldApplyHeightClass(index: number): boolean {
  //   return index === 3;
  // }

  goNext() {
    if (this.currentIndex === 3) {
      this.commonService.goToRoute('get-started')
      return;
    }
    const swiperEl = document.querySelector('swiper-container');
    // @ts-ignore
    swiperEl.swiper.slideNext();
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    if (this.currentIndex === 3) {
      this.classToApply = 'height-35'
    } else {
      this.classToApply = 'height-50'
    }

  }

  async jumpToApp() {
    this.commonService.goToRoute('/tabs-module/home-tab')
  }
}
