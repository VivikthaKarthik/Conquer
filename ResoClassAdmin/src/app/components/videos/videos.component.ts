import { Component } from '@angular/core';
import { Student } from '../../models/student';
import { ColDef } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { Course } from '../../models/course';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css',
})
export class VideosComponent {
  studentsList: Student[] = [];
  colDefs: ColDef[] = [];
  courseData: Course[] = [];

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private dialog: MatDialog,
    public notificationService: NotificationService,
    private router: Router
  ) {
    this.colDefs.push({
      headerName: 'S.NO',
      field: 'id',
      filter: 'agTextColumnFilter',
      lockVisible: false,
    });
    this.colDefs.push({
      headerName: 'Admission ID',
      field: 'admissionId',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Name',
      field: 'name',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Father Name',
      field: 'fatherName',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Mother Name',
      field: 'motherName',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Class/Course',
      field: 'courseId',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Gender',
      field: 'gender',
      filter: 'agTextColumnFilter',
    });

    this.colDefs.push({
      headerName: 'Admission Date',
      field: 'admissionDate',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Date of Birth',
      field: 'dateOfBirth',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Mobile Number',
      field: 'mobileNumber',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Email',
      field: 'email',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Alternate Number',
      field: 'alternateMobileNumber',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Address',
      field: 'addressLine1',
      filter: 'agTextColumnFilter',
    });
  }

  deleteStudent(cId: number) {
    this.masterService
      .delete(cId, 'Student', 'Delete')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllStudents();
        } else {
          alert(data.message);
        }
      });
  }
  getAllStudents() {
    this.masterService.getAll('Student', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.studentsList = data.result;
      } else {
        alert(data.message);
      }
    });
  }

  showConfirmation(id: any): void {
    Swal.fire({
      text: 'Do you really want to remove this Student?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteStudent(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  // Event handler for file input change event
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
  }

  editGridRecord(id: any) {
    this.router.navigate(['/editstudent'], { queryParams: { id: id } });
  }

  deleteGridRecord(id: any) {
    this.showConfirmation(id);
  }
}
