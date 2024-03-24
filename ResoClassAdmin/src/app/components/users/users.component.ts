import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Chapters } from '../../models/chapters';
import { DataMappingService } from '../../services/data-mapping.service';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Course } from '../../models/course';
import { Subject } from '../../models/subject';
import { Student } from '../../models/student';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { User } from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  chapters: Chapters[] | undefined;
  subjects: Subject[] | undefined;
  userList: User[] = [];
  chapterName: string = '';
  studentId: any;
  courseData: Course[] = [];
  subjectData: Subject[] = [];
  selectedOption: any;
  selSubjectId: number | undefined;
  selectedFile: File | undefined;
  showBulkUploadButton: boolean = false;
  imageUrl: string | undefined;
  isChecked: boolean = false;
  isAddPopupVisible: boolean = true;
  colDefs: ColDef[] = [];
  pageName: string = 'Student';

  OnDocumentUpload(event: any): void {
    this.getUsers();
  }

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  roleId: number = 0;
  password: string = '';
  lastLoginDate: Date = new Date();
 

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private dialog: MatDialog,
    public notificationService: NotificationService,
    private router: Router
  ) {
    
    this.colDefs.push({
      headerName: 'Fist Name',
      field: 'firstName',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Last Name',
      field: 'lastName',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Email',
      field: 'email',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Phone Number',
      field: 'phoneNumber',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Role',
      field: 'role',
      filter: 'agTextColumnFilter',
    });

    
  }

  ngOnInit(): void {
    this.getUsers();
    
  }

  getStudentById(cId: any) {
    this.router.navigate(['/editstudent'], { queryParams: { id: cId } });
  }
  getUsers() {
    this.masterService.getAll('User', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.userList = data.result;
      } else {
        alert(data.message);
      }
    });
  }

  showConfirmation(id: any): void {
    Swal.fire({
      text: 'Do you really want to remove this User?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  delete(cId: number) {
    this.masterService
      .delete(cId, 'User', 'Delete')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getUsers();
        } else {
          alert(data.message);
        }
      });
  }

  // Event handler for file input change event
  onFileSelected(event: any): void {
    if (event.target.files !== undefined && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.showBulkUploadButton = true;
    } else {
      this.selectedFile = undefined;
      this.showBulkUploadButton = false;
    }
  }

  getAllCourses() {
    this.masterService.getAll('Course', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.courseData = this.dataMappingService.mapToModel<Course>(
          data.result,
          (item) => ({
            id: item.id,
            name: item.name,
            thumbnail: item.thumbnail,
          })
        );
        console.log(this.courseData);
      } else {
        alert(data.message);
      }
    });
  }

  editGridRecord(id: any) {
    this.getStudentById(id);
  }

  deleteGridRecord(id: any) {
    this.showConfirmation(id);
  }
}
