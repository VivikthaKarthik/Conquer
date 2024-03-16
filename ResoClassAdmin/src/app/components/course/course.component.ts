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
  courseForm: FormGroup;
  submitted: boolean = false;
  labelText: string = 'Couse Name is Required';
  isAddPopupVisible: boolean = true;
  showBulkUploadButton: boolean = false;
  selectedFile: File | undefined;
  pageName: string = 'Course';

  OnDocumentUpload(event: any): void {
    this.getAllCourses();
  }

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
      this.courseForm = this.formBuilder.group({
        name: ['', Validators.required],
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
    if (this.courseForm.invalid) {
      return;
    } else {
      this.createCourse();
    }
  }

  createCourse() {
    var objCourse = {
      name: this.courseForm.value.name,
      thumbnail: 'NA',
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
    this.isAddPopupVisible = false;
    window.location.reload();
  }

  updateCourse() {
    var objCourse = {
      id: this.courseId,
      name: this.courseName,
      thumbnail: 'NA',
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
    if (event.target.files !== undefined && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.showBulkUploadButton = true;
    } else {
      this.selectedFile = undefined;
      this.showBulkUploadButton = false;
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
