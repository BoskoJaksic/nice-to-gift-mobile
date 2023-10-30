import {Component, Input, OnInit} from '@angular/core';
import {ShopApiServices} from "../../shared/services/shop-api.services";
import {ToasterService} from "../../shared/services/toaster.service";
import {StorageService} from "../../shared/services/storage.service";
import {GetShopReviewModel} from "../../shared/model/shops/get-shop-review.model";
import {ActivatedRoute} from "@angular/router";
import {ShopService} from "../../shared/services/shop.service";

@Component({
  selector: 'app-shop-reviews',
  templateUrl: './shop-reviews.component.html',
  styleUrls: ['./shop-reviews.component.scss'],
})
export class ShopReviewsComponent implements OnInit {
  textRate: string = ''
  userRating: number = 3;
  ratingVisible: boolean = false
  shopReviews: GetShopReviewModel[] = []
  page: number = 1
  @Input() shopId: string = ''

  constructor(private shopApiService: ShopApiServices,
              private toasterService: ToasterService,
              private route: ActivatedRoute,
              private shopService: ShopService,
              private storageService: StorageService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id !== 'false') {
        this.page = 1;
      }
      this.shopId = this.shopService.getShopId();
      this.getShopReviews(this.page);
    });
  }

  async getShopReviews(page: number) {
    this.shopApiService.getShopReview(this.shopId, page).subscribe(r => {
      // @ts-ignore
      if (r.data.length > 0) {
        // Format the date in "dd/mm/yyyy hh:mm" format for the new reviews
        // @ts-ignore
        const formattedReviews = r.data.map(review => {
          const formattedDate = this.formatDate(review.createdAt);
          return {
            ...review,
            createdAt: formattedDate
          };
        });

        // If it's the first page, replace the existing reviews
        if (page === 1) {
          this.shopReviews = formattedReviews;
        } else {
          // If it's not the first page, append the new reviews to the existing list
          this.shopReviews = [...this.shopReviews, ...formattedReviews];
        }
      }
    });
  }

  onIonInfinite(event: any) {
    this.page++; // Increase the page number
    this.getShopReviews(this.page);// Call your existing getAllShops method with the updated page number
    event.target.complete();
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  async saveReview() {
    let userId = await this.storageService.getItem('userId')
    let data = {
      reviewerId: userId,
      shopId: this.shopService.getShopId(),
      rating: this.userRating,
      comment: this.textRate
    }
    this.shopApiService.postShopReview(data).subscribe(() => {
      this.toasterService.presentToast('Review successfully added', 'success');
      this.ratingVisible = false;
      this.textRate = ''
      this.getShopReviews(this.page);
    })

  }

  discardReview() {
    this.ratingVisible = !this.ratingVisible
    this.textRate = ''
  }

  toggleRating() {
    this.ratingVisible = !this.ratingVisible
  }

  setRating(rating: number): void {
    this.userRating = rating;
  }
}
