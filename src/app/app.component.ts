import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "./models/products";
import {Pagination} from "./models/Pagination";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = "Leaf and Loom";
  products: Product[] = [];

  constructor(private http: HttpClient, private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#FCF7EB'
  }

  ngOnInit(): void {
    this.http.get<Pagination<Product[]>>('https://localhost:5001/api/products').subscribe({
      next: (response) => {
        this.products = response.data
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log('complete')
      }
    })
  }
}
