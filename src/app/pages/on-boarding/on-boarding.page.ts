import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonService} from "../../services/common.service";
import Swiper from "swiper";
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  classToApply = 'height-50';

  constructor(public commonService: CommonService) {
  }

  currentIndex: number = 0;
  slides: any

  ngOnInit() {

    const swiperEl = document.querySelector('swiper-container');
    // @ts-ignore
    this.slides = swiperEl.swiper.slides
  }



  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper
  }

  goNext() {
    const swiperEl = document.querySelector('swiper-container');
    if (this.currentIndex === 3) {
      this.commonService.goToRoute('get-started')
      // @ts-ignore
      swiperEl.swiper.destroy(true,true);
      return;
    }
    // @ts-ignore
    swiperEl.swiper.slideNext();
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    if (this.currentIndex === 3) {
      this.classToApply = 'height-35'
    } else {
      this.classToApply = 'height-50'
    }

  }
  ngOnDestroy(): void {

  }
}
