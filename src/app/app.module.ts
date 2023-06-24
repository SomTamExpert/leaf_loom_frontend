import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {ShopModule} from "./shop/shop.module";
import {HomeModule} from "./home/home.module";
import {ContactModule} from "./contact/contact.module";
import {MasteryModule} from "./mastery/mastery.module";
import {OurTeamModule} from "./our-team/our-team.module";
import {ImprintModule} from "./imprint/imprint.module";
import {CloudinaryModule} from "@cloudinary/ng";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    HttpClientModule,
    CoreModule,
    ShopModule,
    HomeModule,
    ContactModule,
    MasteryModule,
    OurTeamModule,
    ImprintModule,
    CloudinaryModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
