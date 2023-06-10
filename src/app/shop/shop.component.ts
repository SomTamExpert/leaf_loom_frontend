import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product} from "../shared/models/products";
import {ShopService} from "./shop.service";
import {Type} from "../shared/models/type";
import {ShopParams} from "../shared/models/shopParams";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  types: Type[] = [];
  shopParams: ShopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Ascending', value: 'priceAsc'},
    {name: 'Price: Descending', value: 'priceDesc'}
  ];
  totalCount = 0;

  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.getProducts()
    this.getProductTypes()
  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getProductTypes(): void {
    this.shopService.getProductTypes().subscribe({
      next: (response) => {
        this.types = [{id: 0, name: 'All'}, ...response]
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onTypeSelected(event: any): void {
    this.shopParams.typeId = event.target.value
    this.shopParams.pageNumber = 1;
    this.getProducts()
  }

  onSortSelected(event: any): void {
    this.shopParams.sort = event.target.value
    this.getProducts()
  }
  onPageChanged(event: any): void {
    if (this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event;
      this.getProducts()
    }
  }
  onSearch(): void {
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts()
  }

  onReset(): void {
    if(this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
