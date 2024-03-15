import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrl: './bulk-upload.component.css',
})
export class BulkUploadComponent {
  selectedFile: File | undefined;
  @Output() onFileUpload = new EventEmitter();
  showBulkUploadButton: boolean = false;

  onFileSelected(event: any): void {
    if (event.target.files !== undefined && event.target.files.length > 0) {
      this.showBulkUploadButton = true;
      this.onFileUpload.emit(event.target.files[0]);
    } else {
      this.showBulkUploadButton = false;
    }
  }
}
