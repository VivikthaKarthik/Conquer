import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent {
  selectedFile: File | undefined;
  thumbnailUrl: string = 'assets/img/size_thumb.png';
  @Output() onFileUpload = new EventEmitter();
  showBulkUploadButton: boolean = false;
  @Input() imageURL : string | undefined;

  constructor(){
    if(this.imageURL !== undefined)
    this.thumbnailUrl = this.imageURL;
  }
  
  onFileSelected(event: any): void {
    if (event.target.files !== undefined && event.target.files.length > 0) {
      this.showBulkUploadButton = true;

      const files = event.target.files;
      if (files.length === 0) return;

      const mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        alert('Only images are supported.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.thumbnailUrl = e.target.result;
      };
      reader.readAsDataURL(files[0]);
      this.onFileUpload.emit(files[0]);
    } else {
      this.showBulkUploadButton = false;
    }
  }
}
