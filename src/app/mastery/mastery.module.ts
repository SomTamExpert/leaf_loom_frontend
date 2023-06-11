import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MasteryComponent} from './mastery/mastery.component';


@NgModule({
  declarations: [
    MasteryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MasteryComponent
  ]
})
export class MasteryModule {
}
