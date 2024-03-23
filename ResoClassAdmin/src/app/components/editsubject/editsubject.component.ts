import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Course } from '../../models/course';
import { ListItem } from '../../models/listItem';
import { Subject } from '../../models/subject';

@Component({
  selector: 'app-editsubject',
  templateUrl: './editsubject.component.html',
  styleUrl: './editsubject.component.css',
})
export class EditsubjectComponent {
  subjectList: Subject[] = [];
  subjectName: string = '';
  subjectId: any;
  courseData: ListItem[] = [];
  classData: ListItem[] = [];
  isPopupVisible: any;
  selectedValue: string = '';
  editSubjectForm!: FormGroup;
  submitted: boolean = false;
  selectedId: number = 0;
  selectedOption: any;
  selectedFile: File | undefined;
  pageName: string = 'Subject';
  showBulkUploadButton: boolean = false;
  selectedImageURL: any;

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // Reactive-Form validations
    {
      this.editSubjectForm = this.fb.group({
        name: ['', Validators.required],
        course: ['', Validators.required],
        class: ['', Validators.required],
      });
    }
  }
  ngOnInit(): void {
    this.getAllCourses();
    this.route.queryParams.subscribe((params) => {
      const id: string = params['id'];
      this.subjectId = id;
      this.getSubjectById(id);
    });
  }
  getSubjectById(sId: any) {
    this.subjectId = sId;
    this.masterService.getById(sId, 'Subject', 'Get').subscribe((data: any) => {
      if (data.isSuccess) {
        if (data.result != null && data.result.name != null) {
          this.selectedImageURL = data.result.thumbnail;
          this.editSubjectForm.controls.course.setValue(data.result.courseId);
          this.editSubjectForm.controls.class.setValue(data.result.classId);
          this.editSubjectForm.controls.name.setValue(data.result.name);
        } else {
          alert('Some error occured..! Plaese try again');
        }
      } else {
        alert(data.message);
      }
    });
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
  onSubmit() {
    this.submitted = true;
    if (this.editSubjectForm.invalid) {
      return;
    } else {
      this.updateSubject(this.subjectId);
    }
  }

  updateSubject(id: any) {
    var subjectData = {
      id: this.subjectId,
      name: this.subjectName,
      courseId: parseInt(this.selectedValue),
      classId: parseInt(this.selectedOption),
      thumbnail: 'NA',
    };
    if (this.selectedFile != null) {
      this.masterService
        .putWithFile(
          subjectData,
          this.selectedFile,
          'Subject',
          'UpdateWithFile'
        )
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.router.navigate(['/subject']);
          } else {
            alert(data.message);
          }
        });
    } else {
      this.masterService
        .put(subjectData, 'Subject', 'Update')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.router.navigate(['/subject']);
          } else {
            alert(data.message);
          }
        });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event;
  }
  onSelectionChange(event: any): void {
    const selectedId = parseInt(event.target.value, 10); // Parse value to integer
    this.selectedId = selectedId;
  }
}
