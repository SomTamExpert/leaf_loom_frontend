import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {CloudinaryService} from "../../cloudinary.service";
import {CloudinaryImage} from "@cloudinary/url-gen";
import cloudinary, {Cloudinary} from "cloudinary-core";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  currentFile?: File;
  preview = '';
  imageInfos?: Observable<any>;
  @Output() fileInputChanged: EventEmitter<File> = new EventEmitter<File>();

  constructor() {
  }

  ngOnInit(): void {
  }

  selectFile(event: any): void {
    if (event.target.files) {
      this.fileInputChanged.emit(event.target.files[0]);
      this.currentFile = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.preview = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
