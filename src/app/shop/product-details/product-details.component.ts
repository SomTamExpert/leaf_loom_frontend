import { Component, OnInit } from '@angular/core';
import {ShopService} from "../shop.service";
import {Product} from "../../shared/models/products";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.shopService.getProduct(+id).subscribe(product => {
        this.product = product;
      }, error => {
        console.log(error);
      })
    }
  }
}
