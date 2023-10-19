import {Component, OnInit} from '@angular/core';
import {mockReviews} from "../../shared/mock-reviews";

@Component({
  selector: 'app-shop-reviews',
  templateUrl: './shop-reviews.component.html',
  styleUrls: ['./shop-reviews.component.scss'],
})
export class ShopReviewsComponent implements OnInit {
  mockReviews: any
  textRate: String = ''
  userRating: number = 3;
  ratingVisible: boolean = false

  constructor() {
  }

  ngOnInit() {
    this.mockReviews = mockReviews
  }

  saveReview() {
    console.log(
      'ur', this.userRating,
      'text', this.textRate
    )
  }
  discardReview(){
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
