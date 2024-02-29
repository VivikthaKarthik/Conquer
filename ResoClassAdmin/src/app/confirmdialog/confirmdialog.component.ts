import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrl: './confirmdialog.component.css'
})
export class ConfirmdialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  showAlert(): void {
    Swal.fire('Hello World!');
  }

  showConfirmation(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }
}


