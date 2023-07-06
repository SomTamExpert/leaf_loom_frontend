import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {PagingHeaderComponent} from './paging-header/paging-header.component';
import {PagerComponent} from './pager/pager.component';
import {ImageUploadComponent} from "./image-upload/image-upload.component";

@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    ImageUploadComponent
  ]
})
export class SharedModule {
}
