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

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {
  chapters: Chapters[] | undefined;
  subjects: Subject[] | undefined;
  studentsList: Student[] = [];
  chapterName: string = '';
  studentId: any;
  courseData: Course[] = [];
  subjectData: Subject[] = [];
  selectedOption: any;
  selSubjectId: number | undefined;
  selectedFile: File | undefined;
  imageUrl: string | undefined;
  isChecked: boolean = false;
  isAddPopupVisible: boolean = true;
  colDefs: ColDef[] = [];


  admissionId: string = "";
  studenrName: string = "";
  fatherName: string = "";
  motherName: string = "";
  dateOfBirth: Date = new Date()
  courseId: number = 0;
  admissionDate: Date = new Date();
  MobileNumber: string = "";
  EmailAddress: string = "";
  AlternateMobileNumber: string = "";
  AddressLine1: String = "";
  AddressLine2: String = "";
  Gender: string = "";
  landMark: string = "";
  stateId: number = 0;
  cityId: number = 0;


  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService, private dialog: MatDialog, public notificationService: NotificationService, private router: Router
  ) {
    this.colDefs.push({
      headerName: 'S.NO', field: 'id', filter: 'agTextColumnFilter'
    });
    this.colDefs.push({
      headerName: 'Admission ID', field: 'admissionId', filter: 'agTextColumnFilter'
    });
    this.colDefs.push({
      headerName: 'Name', field: 'name', filter: 'agTextColumnFilter'
    });
    this.colDefs.push({
      headerName: 'Father Name', field: 'fatherName', filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Mother Name', field: 'motherName', filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Class/Course', field: 'courseId', filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Gender', field: 'gender', filter: 'agTextColumnFilter',
    });

    this.colDefs.push({
      headerName: 'Admission Date', field: 'admissionDate', filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Date of Birth', field: 'dateOfBirth', filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Mobile Number', field: 'mobileNumber', filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Email', field: 'email', filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Alternate Number', field: 'alternateMobileNumber', filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Address', field: 'addressLine1', filter: 'agTextColumnFilter',
    });

  }

  ngOnInit(): void {
    this.getAllStudents();
    this.getAllCourses();

  }

  getStudentById(cId: any) {

    this.router.navigate(['/student'], { queryParams: { id: cId } });
  }
  getAllStudents() {
     
    this.masterService.getAll('Student', 'GetAll')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.studentsList = data.result;
        } else {
          alert(data.message);
        }
      });
  }






  showConfirmation(id: any): void {
    Swal.fire({

      text: 'Do you really want to remove this course/class?',
      icon: 'warning',
      showCancelButton: true,

      // confirmButtonText: 'Yes, delete it!',
      // cancelButtonText: 'No, cancel!',
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteStudent(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }

  deleteStudent(cId: any) {

    this.masterService
      .delete(cId, 'Chapter', 'Delete')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllStudents();
        } else {
          alert(data.message);
        }
      });
  }

  // Event handler for file input change event
  onFileSelected(event: any): void {

    const file: File = event.target.files[0];
    if (file) {
      // Call the service method to read Excel file
      // this.excelService.readExcelFile(file);
      // // If you need to upload the file to a backend
      // this.excelService.uploadExcelFile(file,'Course', 'Upload');
      const formData = new FormData();
      formData.append('file', file);
      this.masterService.post(formData, 'Students', 'Upload')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            alert(data.result);
            this.getAllStudents();
          } else {
            alert(data.message);
          }
        });
    }
    else {
      alert("Please select a File!")
    }
  }

  getAllCourses() {
     
    this.masterService.getAll('Course', 'GetAll')
      .subscribe((data: any) => {

        if (data.isSuccess) {
          this.courseData = this.dataMappingService.mapToModel<Course>(
            data.result,
            (item) => ({
              id: item.id,
              name: item.name,
              thumbnail: item.thumbnail,
            }))
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
