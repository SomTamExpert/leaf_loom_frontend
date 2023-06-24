import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  currentFile?: File;
  preview = '';
  isDragging = false;
  @Output() fileInputChanged: EventEmitter<File> = new EventEmitter<File>();

  constructor() {}

  ngOnInit(): void {}

  selectFile(event: any): void {
    if (event.target.files) {
      this.handleFileChange(event.target.files[0]);
    }
  }

  public handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFileChange(event.dataTransfer.files[0]);
    }
  }

  public handleDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  public handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  private handleFileChange(file: File): void {
    this.currentFile = file;
    this.fileInputChanged.emit(file);
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.preview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  public resetComponent(): void {
    this.currentFile = undefined;
    this.preview = '';
    this.isDragging = false;
  }
}
