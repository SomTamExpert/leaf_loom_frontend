import {Component, OnInit} from '@angular/core';
import {ShopService} from "../shop.service";
import {Product} from "../../shared/models/products";
import {ActivatedRoute} from "@angular/router";
import {Pot} from "../../shared/models/pot";
import {ShopParams} from "../../shared/models/shopParams";
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  pots: Pot[] = [];
  imgUrl: string = '';
  products: Product[] = [];

  randomProducts: Product[] = [];
  shopParams: ShopParams = new ShopParams();
  totalCount = 0;
  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.loadProduct();
    this.loadPots();
    this.getProducts();
  }

  private loadProduct(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (id) {
      this.shopService.getProduct(+id).subscribe(product => {
        this.product = product;
        this.imgUrl = this.product.images.grey;
      }, error => {
        console.log(error);
      })
    }
  }
  private getProducts(): void {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
        this.randomProducts = this.getRandomProducts(this.products);
        console.log(this.products)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  private loadPots(): void {
    this.shopService.getPots().subscribe(pots => {
        this.pots = pots;
      },
      error => {
        console.log(error);
      })
  }
  public onSelectPot(color: string): void {
    this.imgUrl = this.product?.images[color];
  }

  private getRandomProducts(products: Product[]): Product[] {
    const randomProducts: Product[] = [];
    const indexes: Set<number> = new Set();
    while (indexes.size < 4) {
      const randomIndex = Math.floor(Math.random() * products.length);
      indexes.add(randomIndex);
    }
    for (const index of indexes) {
      randomProducts.push(products[index]);
    }
    return randomProducts;
  }
}
