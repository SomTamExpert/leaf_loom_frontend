import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../shared/models/products";
import {ShopService} from "../shop.service";
import {Review} from "../../shared/models/reviews";
import { HttpResponse} from "@angular/common/http";
import {CloudinaryService} from "../../cloudinary.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-review-form',
  templateUrl: './product-review-form.component.html',
  styleUrls: ['./product-review-form.component.scss']
})
export class ProductReviewFormComponent implements OnInit {
  product?: Product;
  review: Review = {
    title: '',
    comment: '',
    rating: 0,
    author: '',
    productId: 0,
    imageUrl: '',
    date: ''
  };
  @Input()
  productId: number = 0;

  public currentFile?: File;
  stars : number[] = [1, 2, 3, 4, 5];

  constructor(private shopService: ShopService, private cloudinaryService: CloudinaryService, private location: Location) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.upload();
    this.review.productId = this.productId;
    this.review.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.shopService.postReview(this.review).subscribe(
      (response) => {
        this.review = {
          title: '',
          comment: '',
          rating: 0,
          author: '',
          productId: this.productId,
          imageUrl: '',
          date: ''
        };
      },
      (error) => {
        // Handle error if the review submission fails
        console.error('Failed to submit review:', error);
      }
    );
  }

  upload(): void {
    if (this.currentFile) {
        this.cloudinaryService.upload(this.currentFile).subscribe({
          next: (event: any) => {
            if (event instanceof HttpResponse) {
            }
          },
          error: (error) => {
            console.log(error);
          }
        });
        this.review.imageUrl = this.cloudinaryService.getCloudinaryImage(this.currentFile.name).toURL();
        this.currentFile = undefined;
      }
    }
}
