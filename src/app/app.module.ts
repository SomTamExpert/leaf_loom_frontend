import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgOptimizedImage} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CoreModule} from "./core/core.module";
import {HomeModule} from "./home/home.module";
import {ContactModule} from "./contact/contact.module";
import {MasteryModule} from "./mastery/mastery.module";
import {OurTeamModule} from "./our-team/our-team.module";
import {ImprintModule} from "./imprint/imprint.module";
import {CloudinaryModule} from "@cloudinary/ng";
import {ErrorInterceptor} from "./core/interceptors/error.interceptor";
import {LoadingInterceptor} from "./core/interceptors/loading.interceptor";

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
    HomeModule,
    ContactModule,
    MasteryModule,
    OurTeamModule,
    ImprintModule,
    CloudinaryModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
