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
import { Router } from '@angular/router';
import { Course } from '../../models/course';
import { ListItem } from '../../models/listItem';

@Component({
  selector: 'app-addsubtopic',
  templateUrl: './addsubtopic.component.html',
  styleUrl: './addsubtopic.component.css'
})
export class AddsubtopicComponent {
  addSubTopicForm!: FormGroup;
  studentName: string = '';
  selectedFile: File | undefined;
  courseData: ListItem[] = [];
  classData: ListItem[] = [];
  subjectData: ListItem[] = [];
  chapterData: ListItem[] = [];
  topicData: ListItem[] = [];
  submitted = false;
  selectedOption: any;
  selectedCity: any;
  pageName: string = 'Student';
  selectedImageURL: any;
  isChecked:boolean = false;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private router: Router  
  ) { }

  ngOnInit(): void {
    this.isChecked = true;
    this.getCourses();
   
    this.addSubTopicForm = this.fb.group({
      
      name: ['', Validators.required],
      sourceURL: ['', Validators.required],
      duration: ['', Validators.required],
      selCourseId: ['', Validators.required],
      selClassId: ['', Validators.required],
      selSubId: ['', Validators.required],
      selChapterId: ['', Validators.required],
      selTopicId: ['', Validators.required],
      classNotesURL: ['', Validators.required],
      extractURL: ['', Validators.required],
      // rating: ['', Validators.required],
      thumbnail: [''],
      description: ['', Validators.required],
      homeDisplay: [''],
      
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
    if (Id !== undefined && Id !== 0) {
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
    else {
      this.masterService.getListItems('Class', '', 0).subscribe((data: any) => {
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
    if (Id !== undefined && Id !== 0) {
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
    else {
      this.masterService.getListItems('Subject', '', 0).subscribe((data: any) => {
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
  getChapterBySubID(Id: number) {
    if (Id !== undefined && Id !== 0) {
      this.masterService
        .getListItems('Chapter', 'Subject', Id)
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.chapterData = this.dataMappingService.mapToModel<ListItem>(
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
    else {
      this.masterService.getListItems('Chapter', '', 0).subscribe((data: any) => {
        if (data.isSuccess) {
          this.chapterData = this.dataMappingService.mapToModel<ListItem>(
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
  getTopicByChapterID(Id: number) {
    if (Id !== undefined && Id !== 0) {
      this.masterService
        .getListItems('Topic', 'Chapter', Id)
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.topicData = this.dataMappingService.mapToModel<ListItem>(
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
    else {
      this.masterService.getListItems('Topic', '', 0).subscribe((data: any) => {
        if (data.isSuccess) {
          this.topicData = this.dataMappingService.mapToModel<ListItem>(
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
    if (this.addSubTopicForm.invalid) {
      return;
    } else {
      this.saveSubTopic();
    }
  }
  saveSubTopic() {
    var objST = {
      Name: this.addSubTopicForm.value.name,
      SourceUrl: this.addSubTopicForm.value.sourceURL,
      Duration: this.addSubTopicForm.value.duration,
      Course: this.addSubTopicForm.value.selCourseId,
      Class: this.addSubTopicForm.value.selClassId,
      Subject: this.addSubTopicForm.value.selSubId,
      ChapterId: this.addSubTopicForm.value.selChapterId,
      TopicId: this.addSubTopicForm.value.selTopicId,
      ClassNotesUrl: this.addSubTopicForm.value.classNotesURL,
      ExtractUrl: this.addSubTopicForm.value.extractURL,
      Thumbnail: this.addSubTopicForm.value.thumbnail,
      Description: this.addSubTopicForm.value.description,
      HomeDisplay: this.addSubTopicForm.value.homeDisplay,

    };
    console.log(JSON.stringify(objST));
    this.masterService
      .postWithFile(objST, this.selectedFile, 'SubTopic', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.router.navigate(['/subtopic']);
        } else {
          alert(data.message);
        }
      });
  
  }

  OnDocumentUpload(event: any): void {
    this.router.navigate(['/subtopic']);
  }
}

