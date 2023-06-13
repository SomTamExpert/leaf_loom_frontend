import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {RouterLinkWithHref, RouterModule} from "@angular/router";
import {FooterComponent} from './footer/footer.component';


@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
  ]
})
export class CoreModule {
}
