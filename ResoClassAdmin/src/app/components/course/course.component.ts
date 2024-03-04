import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ColDef } from 'ag-grid-community';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent {

  courseList: any[] = [];
  colDefs: ColDef[] = [];
  courseName: string = '';
  courseId: any;
  

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private dialog: MatDialog
  ) {
    this.colDefs.push({
      headerName: 'Course ID', field: 'id', filter: 'agTextColumnFilter'
    });
    this.colDefs.push({
      headerName: 'Course', field: 'name', filter: 'agTextColumnFilter'
    });
    this.colDefs.push({
      headerName: 'Thumbnail', field: 'thumbnail', filter: 'agTextColumnFilter',
    });
  }



  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.masterService.getAll('Course', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.courseList = data.result;
      } else {
        alert(data.message);
      }
    });
  }

  getCourseById(cId: any) {
    this.courseId = cId;
    this.masterService.getById(cId, 'Course', 'Get').subscribe((data: any) => {
      if (data.isSuccess) {
        if (data.result != null && data.result.name != null) {
          this.courseName = data.result.name;
        } else {
          alert('Some error occured..! Plaese try again');
        }
      } else {
        alert(data.message);
      }
    });
  }

  createCourse() {
    var objCourse = {
      name: this.courseName,
      thumbnail: 'course ThumbNail',
    };
    this.masterService
      .post(objCourse, 'Course', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllCourses();
        } else {
          alert(data.message);
        }
      });
  }

  updateCourse() {
    var objCourse = {
      id: this.courseId,
      name: this.courseName,
      thumbnail: 'Course Thumbnail',
    };
    this.masterService
      .put(objCourse, 'Course', 'Update')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllCourses();
        } else {
          alert(data.message);
        }
      });
  }

  deleteCourse(cId: any) {
    this.masterService
      .delete(cId, 'Course', 'Delete')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllCourses();
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
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCourse(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  // Event handler for file input change event
  onFileSelected(event: any): void {
    debugger;
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      this.masterService
        .post(formData, 'Course', 'Upload')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            alert(data.result);
            this.getAllCourses();
          } else {
            alert(data.message);
          }
        });
    } else {
      alert('Please select a File!');
    }
  }


  editGridRecord(id: any) {
    this.getCourseById(id);

  }

  deleteGridRecord(id: any) {
    this.showConfirmation(id);
  }
}
