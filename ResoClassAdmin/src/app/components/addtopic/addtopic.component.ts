import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { ListItem } from '../../models/listItem';
@Component({
  selector: 'app-addtopic',
  templateUrl: './addtopic.component.html',
  styleUrl: './addtopic.component.css'
})
export class AddtopicComponent {

  addTopicForm!: FormGroup;
  submitted = false;
  courseData: ListItem[] = [];
  subjectData: ListItem[] = [];
  classData: ListItem[] = [];
  topicData: ListItem[] = [];
  chapterData: ListItem[] = [];
  selectedFile: File | undefined;
  isChecked: boolean = true;

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private fb: FormBuilder, private router: Router
  ) { 
    this.addTopicForm = this.fb.group({
      name: ['', Validators.required],
      selCourseId: ['', Validators.required],
      selClassId: ['', Validators.required],
      selSubjectId: ['', Validators.required],
      selChapterId: ['', Validators.required],
      selTopicId: ['', Validators.required],
      description: ['', Validators.required],
    
    });
  }



  ngOnInit(): void {
    this.getCourses();

   
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
  getChaptersBySubID(Id: number) {
    if (Id !== undefined) {
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
  }
  getTopicsByChapterID(Id: number) {
    if (Id !== undefined) {
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
  }

  onFileSelected(event: any): void {
    this.selectedFile = event;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addTopicForm.invalid) {
      return;
    } else {
      this.createTopic();
    }
  }
  createTopic() {
    let chapterId: number = Number(this.addTopicForm.value.selChapterId);
    var topicData = {
      name: this.addTopicForm.value.name,
      chapterId: chapterId,
      isRecommended: this.isChecked,
      description: this.addTopicForm.value.description,
      thumbnail:"na",
    };

    this.masterService
      .postWithFile(topicData, this.selectedFile, 'Topic', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.router.navigate(['/topic']);
        } else {
          alert(data.message);
        }
      });

  }

}
