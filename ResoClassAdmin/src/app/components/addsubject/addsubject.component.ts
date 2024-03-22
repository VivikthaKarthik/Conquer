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
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrl: './addsubject.component.css'
})
export class AddsubjectComponent {
  subjectList: Subject[] = [];
  subjectName: string = '';
  subjectId: any;
  courseData: ListItem[] = [];
  classData: ListItem[] = [];
  isPopupVisible: any;
  selectedValue: string = '';
  addSubjectForm!: FormGroup;
  submitted: boolean = false;
  selectedId: number = 0;
  selectedOption: any;
  selectedFile: File | undefined;
  pageName: string = 'Subject';
  showBulkUploadButton: boolean = false;

  constructor(
    private masterService: MasterService,
    private fb: FormBuilder,
    private dataMappingService: DataMappingService,
    private router: Router

  ) {
    // Reactive-Form validations
    {
      this.addSubjectForm = this.fb.group({
        name: ['', Validators.required],
        course: ['', Validators.required],
        class: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {
    this.getAllCourses();
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.addSubjectForm.invalid) {
      return;
    } else {
      this.createSubject();
    }
  }

  createSubject() {
   
    var subjectData = {
      name: this.addSubjectForm.value.name,
      courseId:this.addSubjectForm.value.course,
      thumbnail: 'NA',
      classId:this.addSubjectForm.value.class,
    };
    this.masterService
      .postWithFile(subjectData, this.selectedFile, 'Subject', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.router.navigate(['/subject']);
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

  getClassesByCourseId(Id: number) {
    if (Id !== undefined) {
      this.masterService
        .getListItems('Class', 'Course', Id)
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.classData = this.dataMappingService.mapToModel<ListItem>(
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
}
