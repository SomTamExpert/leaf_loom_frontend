import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../shared/models/products';
import {ShopService} from '../shop.service';
import {Review} from '../../shared/models/reviews';
import {CloudinaryService} from '../../cloudinary.service';

@Component({
  selector: 'app-product-review-form',
  templateUrl: './product-review-form.component.html',
  styleUrls: ['./product-review-form.component.scss'],
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
    imageUrl2: '',
    date: '',
  };
  @Input()
  productId: number = 0;

  public currentFiles: File[] = [];
  stars: number[] = [1, 2, 3, 4, 5];

  constructor(
    private shopService: ShopService,
    private cloudinaryService: CloudinaryService,
  ) {
  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    await this.upload();
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
          imageUrl2: '',
          date: '',
        };
      },
      (error) => {
        // Handle error if the review submission fails
        console.error('Failed to submit review:', error);
      }
    );
  }

  async upload(): Promise<void> {
    await this.currentFiles.forEach((file, index) => {
      if (file) {
        this.cloudinaryService.upload(file).subscribe({
          next: (event: any) => {
            if (index === 0) {
              this.review.imageUrl = this.cloudinaryService
                .getCloudinaryImage(file.name)
                .toURL();
            } else if (index === 1) {
              this.review.imageUrl2 = this.cloudinaryService
                .getCloudinaryImage(file.name)
                .toURL();
            }

          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
    this.currentFiles = [];
  }

  onFilesInputChanged(files: File[]): void {
    this.currentFiles = files;
  }
}
