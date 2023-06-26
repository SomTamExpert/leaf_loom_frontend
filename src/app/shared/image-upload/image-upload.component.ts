import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  currentFiles: File[] = [];
  previews: string[] = [];
  isDragging = false;
  @Output() filesInputChanged: EventEmitter<File[]> = new EventEmitter<File[]>();

  constructor() {}

  ngOnInit(): void {}

  selectFiles(event: any): void {
    if (event.target.files) {
      this.handleFilesChange(event.target.files);
    }
  }

  public handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFilesChange(event.dataTransfer.files);
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

  private handleFilesChange(files: FileList): void {
    this.currentFiles = [];
    this.previews = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.currentFiles.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previews[i] = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    this.filesInputChanged.emit(this.currentFiles);
  }

  removeImage(index: number): void {
    this.previews.splice(index, 1);
    this.currentFiles.splice(index, 1);
  }
}
