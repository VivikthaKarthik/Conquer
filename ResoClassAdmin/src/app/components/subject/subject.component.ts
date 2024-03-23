import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Subject } from '../../models/subject';
import { DataMappingService } from '../../services/data-mapping.service';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Course } from '../../models/course';
import { Router } from '@angular/router';
import {
  Form,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { ListItem } from '../../models/listItem';
declare var $: any;

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css',
})
export class SubjectComponent {
  subjectList: Subject[] = [];
  subjectName: string = '';
  subjectId: any;
  courseData: ListItem[] = [];
  isPopupVisible: any;
  selectedValue: string = '';
  isAddPopupVisible: boolean = true;
  colDefs: ColDef[] = [];
  subjectForm!: FormGroup;
  submitted: boolean = false;
  selectedId: number = 0;
  selectedOption: any;
  selectedFile: File | undefined;
  showBulkUploadButton: boolean = false;
  pageName: string = 'Subject';

  OnDocumentUpload(event: any): void {
    this.getAllSubjects();
  }

  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private dataMappingService: DataMappingService,
    private dialog: MatDialog,
    private router: Router
  ) {
    {
      // this.colDefs.push({
      //   headerName: 'ID',
      //   field: 'id',
      //   filter: 'agTextColumnFilter',
      //   lockVisible: true,
      // });
      this.colDefs.push({
        headerName: 'Subject',
        field: 'name',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Class',
        field: 'class',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Course',
        field: 'course',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Color Code',
        field: 'colorCode',
        filter: 'agTextColumnFilter',
      });
    }
    // Reactive-Form validations
    {
      this.subjectForm = this.fb.group({
        name: ['', Validators.required],
        course: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {
    this.getAllSubjects();
  }
  getAllSubjects() {
    this.masterService.getAll('Subject', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.subjectList = data.result;
      } else {
        alert(data.message);
      }
    });
  }

  getSubjectById(Id: any) {
    this.router.navigate(['/editsubject'], { queryParams: { id: Id } });
  }
  

  onSubmit() {
    this.submitted = true;
    if (this.subjectForm.invalid) {
      return;
    } else {
      this.createSubject();
    }
  }

  createSubject() {
    var subjectData = {
      name: this.subjectForm.value.name,
      thumbnail: 'NA',
      courseId: this.selectedId,
    };
    this.masterService
      .postWithFile(subjectData, this.selectedFile, 'Subject', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllSubjects();
        } else {
          alert(data.message);
        }
      });
    this.isAddPopupVisible = false;
    window.location.reload();
  }

  updateSubject() {
    var subjectData = {
      id: this.subjectId,
      name: this.subjectName,

      courseId: parseInt(this.selectedValue),
    };
    if (this.selectedFile != null) {
      this.masterService
        .putWithFile(subjectData, this.selectedFile, 'Subject', 'Update')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.getAllSubjects();
          } else {
            alert(data.message);
          }
        });
    } else {
      this.masterService
        .put(subjectData, 'Subject', 'Update')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.getAllSubjects();
          } else {
            alert(data.message);
          }
        });
    }

    this.isAddPopupVisible = false;
    window.location.reload();
  }

  deleteSubject(sId: any) {
    this.masterService
      .delete(sId, 'Subject', 'Delete')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllSubjects();
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
        this.deleteSubject(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

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
    this.masterService.getListItems('Course', '', 0).subscribe((data: any) => {
      if (data.isSuccess) {
        this.courseData = this.dataMappingService.mapToModel<ListItem>(
          data.result,
          (item) => ({
            id: item.id,
            name: item.name,
          })
        );
      } else {
        alert(data.message);
      }
    });
  }

  getAllCoursesForEdit() {
    this.masterService.getListItems('Course', '', 0).subscribe((data: any) => {
      if (data.isSuccess) {
        this.courseData = this.dataMappingService.mapToModel<ListItem>(
          data.result,
          (item) => ({
            id: item.id,
            name: item.name,
          })
        );
        ($('#edit_subject') as any).modal('show');
      } else {
        alert(data.message);
      }
    });
  }

  editGridRecord(id: any) {
    this.getSubjectById(id);
  }

  deleteGridRecord(id: any) {
    this.showConfirmation(id);
  }
  closeModal() {
    ($('#edit_subject') as any).modal('hide');
  }
  onSelectionChange(event: any): void {
    const selectedId = parseInt(event.target.value, 10); // Parse value to integer
    this.selectedId = selectedId;
  }
}
