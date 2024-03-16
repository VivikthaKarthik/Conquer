import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrl: './bulk-upload.component.css',
})
export class BulkUploadComponent {
  selectedFile: File | undefined;
  @Input() pageName: string = '';
  @Output() onFileUpload = new EventEmitter();
  showBulkUploadButton: boolean = false;

  constructor(public masterService: MasterService) {}

  onFileSelected(event: any): void {
    if (event.target.files !== undefined && event.target.files.length > 0) {
      this.showBulkUploadButton = true;
      this.selectedFile = event.target.files[0];
    } else {
      this.showBulkUploadButton = false;
    }
  }

  UploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.masterService
        .post(formData, this.pageName, 'Upload')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            alert(data.result);
            this.onFileUpload.emit(this.selectedFile);
          } else {
            alert(data.message);
          }
        });
    } else {
      alert('Please select a File!');
    }
  }
}
