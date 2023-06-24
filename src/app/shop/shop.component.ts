import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Product} from "../shared/models/products";
import {ShopService} from "./shop.service";
import {Type} from "../shared/models/type";
import {ShopParams} from "../shared/models/shopParams";
import {CloudinaryService} from "../cloudinary.service";
import {CloudinaryImage} from '@cloudinary/url-gen/assets/CloudinaryImage';
import {Transformation} from '@cloudinary/url-gen';
import {Resize, scale} from "@cloudinary/url-gen/actions/resize";
import {autoBest, autoEco, autoLow} from "@cloudinary/url-gen/qualifiers/quality";
import {Effect} from "@cloudinary/url-gen/actions";
import {dpr, format} from "@cloudinary/url-gen/actions/delivery";
import {gif, jpg, png} from "@cloudinary/url-gen/qualifiers/format";
import {source} from "@cloudinary/url-gen/actions/overlay";
import {image, text} from "@cloudinary/url-gen/qualifiers/source";
import {Position} from "@cloudinary/url-gen/qualifiers";
import {cutByImage} from "@cloudinary/url-gen/actions/reshape";
import {TextStyle} from "@cloudinary/url-gen/qualifiers/textStyle";
import {shadow, vectorize} from "@cloudinary/url-gen/actions/effect";
import {recolor} from "@cloudinary/url-gen/actions/adjust";

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
  imageTransformation: string = '';

  constructor(private shopService: ShopService, private cloudinary: CloudinaryService) {
  }

  ngOnInit(): void {
    this.getProducts()
    this.getProductTypes()
    this.loadCloudinary();
  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
        this.loadCloudinary();
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
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

  loadCloudinary(): void {
    let cloudinaryImage: CloudinaryImage;
    this.products.forEach(product => {
      const productName = this.formatProductName(product.name);
      cloudinaryImage = this.cloudinary.getCloudinaryImage(productName);

      // Apply image transformation based on the selected option
      switch (this.imageTransformation) {
        case 'thumbnail':
          cloudinaryImage = cloudinaryImage.resize(Resize.thumbnail().width(150).height(150));
          break;
        case 'scale-width-15':
          cloudinaryImage = cloudinaryImage.resize(Resize.scale().width(0.15).height(0.15));
          break;
        case 'scale-width-25':
          cloudinaryImage = cloudinaryImage.resize(Resize.scale().width(0.25).height(0.25));
          break;
        case 'quality-50':
          cloudinaryImage = cloudinaryImage.quality(50);
          break;
        case 'quality-auto-best':
          cloudinaryImage = cloudinaryImage.quality(autoBest());
          break;
        case 'quality-auto-echo':
          cloudinaryImage = cloudinaryImage.quality(autoEco());
          break;
        case 'quality-low':
          cloudinaryImage = cloudinaryImage.quality(autoLow());
          break;
        case 'sepia':
          cloudinaryImage = cloudinaryImage.effect(Effect.sepia());
          break;
        case 'blur':
          cloudinaryImage = cloudinaryImage.effect(Effect.blur(900));
          break;
        case 'oli-painting':
          cloudinaryImage = cloudinaryImage.effect(Effect.oilPaint(20));
          break;
        case 'crop':
          cloudinaryImage = cloudinaryImage.resize(Resize.crop().width(0.9).height(0.9));
          break;
        case 'metadata':
          cloudinaryImage = cloudinaryImage.delivery(dpr('auto'));
          break;
        case 'watermark':
          cloudinaryImage = cloudinaryImage.overlay(
            source(image("leaf_loom_icon")).position(new Position().tiled()));
          break;
        case 'gif':
          cloudinaryImage = cloudinaryImage.delivery(format(gif()));
          break;
        case 'png':
          cloudinaryImage = cloudinaryImage.delivery(format(png()))
          break;
        case 'jpg':
          cloudinaryImage = cloudinaryImage.delivery(format(jpg()));
          break;
        case 'vectorized':
          cloudinaryImage = cloudinaryImage.effect(
            vectorize().numOfColors(3).detailsLevel(0.5));
          break;
        case 'cartoon':
          cloudinaryImage = cloudinaryImage.effect(Effect.cartoonify());
          break;
        case 'black-white':
          cloudinaryImage = cloudinaryImage.effect(Effect.blackwhite());
          break;
        case 'reshape':
          cloudinaryImage = cloudinaryImage.delivery(format(png()))
            .resize(scale().width(800))
            .reshape(
              cutByImage(
                text(
                  "Leaf & Loom",
                  new TextStyle("Unkempt", 250).fontWeight("bold")
                ).transformation(new Transformation().effect(shadow()))
              )
            )
            .adjust(recolor(
              [
              [0.8, 0.7, 0.1],
              [0.3, 0.6, 0.7],
              [0.8, 0.5, 0.1],
            ]
            ));
          break;
        default:
          break;
      }
      product.images = cloudinaryImage.toURL();
    });
  }

  private formatProductName(name: string): string {
    const formattedName = name.replace(/ /g, '_').toLowerCase();
    return formattedName + '_white_pot';
  }

  public onImageTransformationSelected(): void {
    this.loadCloudinary();
  }
}

