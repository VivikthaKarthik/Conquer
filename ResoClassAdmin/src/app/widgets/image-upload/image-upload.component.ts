import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent {
  selectedFile: File | undefined;
  thumbnailUrl: string = 'assets/img/size_thumb.png';
  @Output() onFileUpload = new EventEmitter();
  @Input() imageURL: string | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.imageURL !== undefined && this.imageURL !== null) {
      this.thumbnailUrl = this.imageURL;
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files !== undefined && event.target.files.length > 0) {
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
    }
  }
}
