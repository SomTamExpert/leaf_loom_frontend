import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {RouterLink, RouterLinkActive, RouterLinkWithHref} from "@angular/router";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterLink

  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {
}
