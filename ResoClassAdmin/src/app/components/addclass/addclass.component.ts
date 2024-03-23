import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { Course } from '../../models/course';
import { ListItem } from '../../models/listItem';
import Swal from 'sweetalert2';
import { Subject } from '../../models/subject';

@Component({
  selector: 'app-addclass',
  templateUrl: './addclass.component.html',
  styleUrl: './addclass.component.css'
})
export class AddclassComponent {
  addclassForm!: FormGroup;
  classList: any[] = [];
  selectedValue: string = '';
  className: string = '';
  classId: any;
  submitted: boolean = false;
  labelText: string = 'Class Name is Required';
  isAddPopupVisible: boolean = true;
  showBulkUploadButton: boolean = false;
  selectedFile: File | undefined;
  pageName: string = 'Class';
  selectedId: number = 0;
  courseData: ListItem[] = [];



  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private dataMappingService: DataMappingService,
    private router: Router

  ) {
    // Reactive-Form validations
    {
      this.addclassForm = this.fb.group({
        name: ['', Validators.required],
        course: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {
    this.getCourses();
  }

  onSubmit() {
    this.submitted = true;
    if (this.addclassForm.invalid) {
      return;
    } else {
      this.createClass();
    }
  }

  createClass() {
    var objClass = {
      name: this.addclassForm.value.name,
      thumbnail: 'NA',
      courseId: this.addclassForm.value.course,
    };
    this.masterService
      .post(objClass, 'Class', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.router.navigate(['/class']);

        } else {
          alert(data.message);
        }
      });

  }


  onSelectionChange(event: any): void {
    const selectedId = parseInt(event.target.value, 10); // Parse value to integer
    this.selectedId = selectedId;
  }
  onFileSelected(event: any): void {
    this.selectedFile = event;
  }

  getCourses() {
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
