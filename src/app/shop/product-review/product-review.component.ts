import {Component, OnInit} from '@angular/core';
import {ShopService} from "../shop.service";
import {ActivatedRoute} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {Review} from "../../shared/models/reviews";
import {CloudinaryImage} from "@cloudinary/url-gen/assets/CloudinaryImage";
import {CloudinaryService} from "../../cloudinary.service";

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent implements OnInit {
  stars = [1, 2, 3, 4, 5];
  paramMapSubscription: Subscription = new Subscription();

  productId: number = 0;
  reviews: Review[] = []
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private cloudinary: CloudinaryService) {
  }

  ngOnInit(): void {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      this.loadReviews(this.productId);
    });
  }

  private loadReviews(id: number): void {
    this.shopService.getReviewsByProductsId(id).subscribe({
      next: (response) => {
        this.reviews = response.data;
      },
      error: (error) => {
        console.log(error)
      }
    })
    this.loadCloudinary();
  }

  getRatingArray(rating: number): number[] {
    return Array.from({length: rating}, (_, index) => index + 1);
  }

  loadCloudinary(): void {
    let cloudinaryImage: CloudinaryImage;
    this.reviews.forEach(review => {
      cloudinaryImage = this.cloudinary.getCloudinaryImage(review.imageUrl);
      review.imageUrl = cloudinaryImage.toURL();
    });
  }
}
