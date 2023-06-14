import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImprintComponent} from "./imprint/imprint.component";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    ImprintComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    ImprintComponent
  ]
})
export class ImprintModule { }
