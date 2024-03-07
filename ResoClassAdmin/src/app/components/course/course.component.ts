import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ColDef } from 'ag-grid-community';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationsService } from '../../services/validations.service';
declare var $: any;

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
  myForm: FormGroup;
  submitted: boolean = false;
  labelText: string = 'Couse Name is Required';

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private validations: ValidationsService
  ) {
    {
      this.colDefs.push({
        headerName: 'Course ID',
        field: 'id',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Course',
        field: 'name',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Thumbnail',
        field: 'thumbnail',
        filter: 'agTextColumnFilter',
      });
    }

    // Reactive-Form validations
    {
      this.myForm = this.formBuilder.group({
        name: [
          '',
          [Validators.required, validations.requiredIfEmptyValidator()],
        ],
        // Add more form controls and validators as needed
      });
    }
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
          ($('#edit_course') as any).modal('show');
        } else {
          alert('Some error occured..! Plaese try again');
        }
      } else {
        alert(data.message);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.myForm.valid) {
      var objCourse = {
        name: this.myForm.value.name,
        thumbnail: this.myForm.value.thumbnail,
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
    } else {
      alert('Course Name is Required!');
    }
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
          ($('#edit_course') as any).modal('hide');
        } else {
          alert(data.message);
          ($('#edit_course') as any).modal('hide');
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

  closeModal() {
    ($('#edit_course') as any).modal('hide');
  }
}
