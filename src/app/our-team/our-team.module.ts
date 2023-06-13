import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OurTeamComponent} from "./our-team/our-team.component";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [OurTeamComponent],
  imports: [
    CommonModule,
    RouterLink,
  ],
  exports: [
    OurTeamComponent

  ]
})
export class OurTeamModule {
}
