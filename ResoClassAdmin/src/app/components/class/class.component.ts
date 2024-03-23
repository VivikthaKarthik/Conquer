import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ColDef } from 'ag-grid-community';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidationsService } from '../../services/validations.service';
import { ListItem } from '../../models/listItem';
declare var $: any;
import { Router } from '@angular/router';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrl: './class.component.css',
})
export class ClassComponent {
  classList: any[] = [];
  selectedValue: string = '';
  colDefs: ColDef[] = [];
  className: string = '';
  classId: any;
  classForm: FormGroup;
  submitted: boolean = false;
  labelText: string = 'Class Name is Required';
  isAddPopupVisible: boolean = true;
  showBulkUploadButton: boolean = false;
  selectedFile: File | undefined;
  pageName: string = 'Class';
  selectedId: number = 0;
  courseData: ListItem[] = [];

  OnDocumentUpload(event: any): void {
    this.getAllClasses();
  }

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private validations: ValidationsService,
    private router: Router
  ) {
    {
      // this.colDefs.push({
      //   headerName: 'Class ID',
      //   field: 'id',
      //   filter: 'agTextColumnFilter',
      // });
      this.colDefs.push({
        headerName: 'Class',
        field: 'name',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Course',
        field: 'course',
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
      this.classForm = this.formBuilder.group({
        name: ['', Validators.required],
        course: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {
    this.getAllClasses();
    this.getAllCourses();
  }

  onSelectionChange(event: any): void {
    const selectedId = parseInt(event.target.value, 10); // Parse value to integer
    this.selectedId = selectedId;
  }

  getAllClasses() {
    this.masterService.getAll('Class', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.classList = data.result;
      } else {
        alert(data.message);
      }
    });
  }

  getClassById(cId: any) {
    this.classId = cId;
    this.masterService.getById(cId, 'Class', 'Get').subscribe((data: any) => {
      if (data.isSuccess) {
        if (data.result != null && data.result.name != null) {
          this.className = data.result.name;
          this.selectedValue = data.result.courseId;
          this.getAllCourses();
          ($('#edit_class') as any).modal('show');
        } else {
          alert('Some error occured..! Plaese try again');
        }
      } else {
        alert(data.message);
      }
    });
  }
  
 

  deleteClass(cId: any) {
    this.masterService.delete(cId, 'Class', 'Delete').subscribe((data: any) => {
      if (data.isSuccess) {
        this.getAllClasses();
      } else {
        alert(data.message);
      }
    });
  }

  showConfirmation(id: any): void {
    Swal.fire({
      text: 'Do you really want to remove this class?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteClass(id);
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

  editGridRecord(Id: any) {
    this.router.navigate(['/editclass'], { queryParams: { id: Id } });
  }

  deleteGridRecord(id: any) {
    this.showConfirmation(id);
  }

  closeModal() {
    ($('#edit_class') as any).modal('hide');
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
}
