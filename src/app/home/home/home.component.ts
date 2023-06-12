import {Component, OnInit} from '@angular/core';
import {tick} from "@angular/core/testing";
import {ShopService} from "../../shop/shop.service";
import {Product} from "../../shared/models/products";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public homeGalleryPictures = [
    {src: 'assets/images/home_gallery_1.png'},
    {src: 'assets/images/home_gallery_3.png'},
    {src: 'assets/images/home_gallery_4.png'},
  ];
  public navigationPictures = [
    {
      title: "Outdoor Greenery",
      text: "Discover",
      link: "/shop",
      src: 'assets/images/menu-outdoor_plants_background.png'
    },
    {
      title: "Outdoor Plant Mastery",
      text: "Discover",
      link: "/mastery",
      src: 'assets/images/menu_plant_mastery_background.png'
    },
    {title: "Rare Greenery", text: "Discover", link: "/shop", src: 'assets/images/menu-rare_plants_background.png'},
  ];

  public bundleProduct?: Product;

  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.getBundleProduct();
  }

  getBundleProduct() {
    this.shopService.getProduct(21).subscribe(response => {
      this.bundleProduct = response;
    }, error => {
      console.log(error);
    })
  }
}
