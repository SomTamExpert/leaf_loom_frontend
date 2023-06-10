import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Product} from "./shared/models/products";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = "Leaf and Loom";

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#FCF7EB'
  }
}
