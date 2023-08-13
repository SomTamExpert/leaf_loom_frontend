import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ShopComponent} from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import {SharedModule} from "../shared/shared.module";
import { ProductDetailsComponent } from './product-details/product-details.component';
import {CloudinaryModule} from "@cloudinary/ng";
import {FormsModule} from "@angular/forms";
import { ProductReviewComponent } from './product-review/product-review.component';
import { ProductReviewFormComponent } from './product-review-form/product-review-form.component';
import {ShopRoutingModule} from "./shop-routing.module";


@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    ProductDetailsComponent,
    ProductReviewComponent,
    ProductReviewFormComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    SharedModule,
    ShopRoutingModule,
    CloudinaryModule,
    FormsModule
  ]
})
export class ShopModule {
}
