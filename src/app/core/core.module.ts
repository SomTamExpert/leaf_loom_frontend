import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {RouterLink, RouterModule} from "@angular/router";
import {FooterComponent} from './footer/footer.component';
import {TestErrorComponent} from './test-error/test-error.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ServerErrorComponent} from './server-error/server-error.component';
import {ToastrModule} from "ngx-toastr";
import { SectionHeaderComponent } from './section-header/section-header.component';


@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SectionHeaderComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    SectionHeaderComponent,
  ]
})
export class CoreModule {
}
