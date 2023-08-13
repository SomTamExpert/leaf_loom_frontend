import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopService} from "../shop.service";
import {Product} from "../../shared/models/products";
import {ActivatedRoute, Router} from "@angular/router";
import {Pot} from "../../shared/models/pot";
import {ShopParams} from "../../shared/models/shopParams";
import {Subscription} from "rxjs";
import {BreadcrumbService} from "xng-breadcrumb";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product?: Product;
  pots: Pot[] = [];
  imgUrl: string = '';
  products: Product[] = [];
  productId: number = 0;
  paramMapSubscription: Subscription = new Subscription();
  randomProducts: Product[] = [];
  shopParams: ShopParams = new ShopParams();
  totalCount = 0;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private router: Router, private breadcrumbService: BreadcrumbService) {
  }

  public ngOnInit(): void {
    this.paramMapSubscription = this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      this.loadProduct(this.productId.toString());
      this.loadPots();
      this.getProducts();
    });

  }

  private loadProduct(id: string): void {
    if (id) {
      this.shopService.getProduct(+id).subscribe(product => {
        this.product = product;
        this.breadcrumbService.set('@productDetails', product.name);
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

  getProductImages(product: any): string[] {
    if (product && product.images) {
      return Object.keys(product.images).filter(key => key !== 'id');
    }
    return [];
  }

  ngOnDestroy(): void {
    this.paramMapSubscription.unsubscribe();
  }

  redirectToShop(productId: number): void {
    this.router.navigate(['/shop', productId]);
  }
}
