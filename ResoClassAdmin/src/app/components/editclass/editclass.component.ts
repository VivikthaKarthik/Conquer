import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course';
import { ListItem } from '../../models/listItem';
import Swal from 'sweetalert2';
import { Subject } from '../../models/subject';

@Component({
  selector: 'app-editclass',
  templateUrl: './editclass.component.html',
  styleUrl: './editclass.component.css',
})
export class EditclassComponent {
  editclassForm!: FormGroup;
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
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Reactive-Form validations
    {
      this.editclassForm = this.fb.group({
        name: ['', Validators.required],
        course: ['', Validators.required],
       
      });
    }
  }

  ngOnInit(): void {
    this.getCourses();
    this.route.queryParams.subscribe((params) => {
      const id: string = params['id'];
      this.classId = id;
      this.getClassById(id);
    });
  }

  getClassById(cId: any) {
    this.classId = cId;
    this.masterService.getById(cId, 'Class', 'Get').subscribe((data: any) => {
      if (data.isSuccess) {
        if (data.result != null && data.result.name != null) {
          this.editclassForm.controls.name.setValue(data.result.name);
          this.editclassForm.controls.course.setValue(data.result.courseId);
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
    if (this.editclassForm.invalid) {
      return;
    } else {
      this.updateClass();
    }
  }

  updateClass() {
    var objClass = {
      id: this.classId,
      name: this.editclassForm.value.name,
      courseId: this.editclassForm.value.course,
    };
    this.masterService
      .put(objClass, 'Class', 'Update')
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
