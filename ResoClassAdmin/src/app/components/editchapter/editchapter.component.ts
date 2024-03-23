import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ListItem } from '../../models/listItem';

@Component({
  selector: 'app-editchapter',
  templateUrl: './editchapter.component.html',
  styleUrl: './editchapter.component.css'
})
export class EditchapterComponent {
  editChapterForm!: FormGroup;
  submitted = false;
  courseData: ListItem[] = [];
  subjectData: ListItem[] = [];
  classData: ListItem[] = [];
  selectedFile: File | undefined;
  isChecked: boolean = true;
  chapterId: number = 0;
  selectedImageURL: any;

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute,
  ) {
    this.editChapterForm = this.fb.group({
      name: ['', Validators.required],
      selCourseId: ['', Validators.required],
      selClassId: ['', Validators.required],
      selSubId: ['', Validators.required],
      description: ['', Validators.required],
    });
  }



  ngOnInit(): void {
    this.getCourses();
  
    this.route.queryParams.subscribe((params) => {
      const id: string = params['id'];
      this.chapterId = parseInt(id);
      this.getChaptersById(this.chapterId);
    });

  }
  getChaptersById(cId: number) {
    this.chapterId = cId;
    this.masterService
      .getById(cId, 'Chapter', 'Get', 'chapterId')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          if (data.result != null && data.result.name != null) {

            this.selectedImageURL = data.result.thumbnail;
            this.editChapterForm.controls.name.setValue(data.result.name);
            this.editChapterForm.controls.selCourseId.setValue(data.result.courseId);
            this.editChapterForm.controls.selClassId.setValue(data.result.classId);
            this.editChapterForm.controls.selSubId.setValue(data.result.subjectId);
            this.editChapterForm.controls.description.setValue(data.result.description);

          } else {
            alert('Some error occured..! Plaese try again');
          }
        } else {
          alert(data.message);
        }
      });
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
  
  getClsByCourseId(Id: number) {
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
  getSubByClsID(Id: number) {
    if (Id !== undefined) {
      this.masterService
        .getListItems('Subject', 'Class', Id)
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.subjectData = this.dataMappingService.mapToModel<ListItem>(
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

  onFileSelected(event: any): void {
    this.selectedFile = event;
  }

  onSubmit() {
    this.submitted = true;
    if (this.editChapterForm.invalid) {
      return;
    } else {
      this.updateChapter();
    }
  }
  updateChapter() {
    let subjID: number = Number(this.editChapterForm.value.selSubId);
    var objChapter = {
      id: this.chapterId,
      name: this.editChapterForm.value.name,
      subjectId: subjID,
      description: this.editChapterForm.value.description,
      isRecommended: this.isChecked,
    };
    if (this.selectedFile !== undefined) {
      this.masterService
        .putWithFile(objChapter, this.selectedFile, 'Chapter', 'Update')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.router.navigate(['/chapter']);
          } else {
            alert(data.message);
          }
        });
     
    } else {
      this.masterService
        .put(objChapter, 'Chapter', 'Update')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.router.navigate(['/chapter']);
          } else {
            alert(data.message);
          }
        });
    }
    window.location.reload();
  }

}

