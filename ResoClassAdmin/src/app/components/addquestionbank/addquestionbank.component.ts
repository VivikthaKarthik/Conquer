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
import { Subject } from '../../models/subject';
import { Chapters } from '../../models/chapters';
import { Topic } from '../../models/topic';
import { SubTopic } from '../../models/subtopics';
import { ListItem } from '../../models/listItem';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-addquestionbank',
  templateUrl: './addquestionbank.component.html',
  styleUrl: './addquestionbank.component.css',
})
export class AddquestionbankComponent {
  addQBForm!: FormGroup;
  videoTitle: string = '';
  courses: ListItem[] | undefined;
  subjects: ListItem[] | undefined;
  chapters: ListItem[] | undefined;
  topics: ListItem[] | undefined;
  subTopics: ListItem[] | undefined;
  selectedFile: File | undefined;
  submitted = false;
  selectedOption: any;
  selectedCity: any;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCourses();

    this.addQBForm = this.fb.group({
      selCourses: ['', Validators.required],
      selSubjects: ['', Validators.required],
      selChapters: ['', Validators.required],
      selTopics: [''],
    });
  }

  getCourses() {
    this.masterService.getListItems('Course', '', 0).subscribe((data: any) => {
      if (data.isSuccess) {
        this.courses = this.dataMappingService.mapToModel<ListItem>(
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

  getSubjectsByCourseId(Id: number) {
    if (Id !== undefined) {
      this.masterService
        .getListItems('Subject', 'Course', Id)
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.subjects = this.dataMappingService.mapToModel<ListItem>(
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

  getChaptersBySubjectId(Id: number) {
    if (Id !== undefined) {
      this.masterService
        .getListItems('Chapter', 'Subject', Id)
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.chapters = this.dataMappingService.mapToModel<ListItem>(
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
  getTopicsByChapterId(Id: number) {
    if (Id !== undefined) {
      this.masterService
        .getListItems('Topic', 'Chapter', Id)
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.topics = this.dataMappingService.mapToModel<ListItem>(
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

  // getSubTopicsByTopicId(Id: number) {
  //   if (Id !== undefined) {
  //     this.masterService
  //       .getListItems('SubTopic', 'Topic', Id)
  //       .subscribe((data: any) => {
  //         if (data.isSuccess) {
  //           this.subTopics = this.dataMappingService.mapToModel<ListItem>(
  //             data.result,
  //             (item) => ({
  //               id: item.id,
  //               name: item.name,
  //             })
  //           );
  //         } else {
  //           alert(data.message);
  //         }
  //       });
  //   }
  // }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onSubmit() {
    this.submitted = true;
    if (this.addQBForm.invalid) {
      return;
    } else {
      this.uploadVideo();
    }
  }
  uploadVideo() {
    var videoData = {
      CourseId: this.addQBForm.value.selCourses,
      SubjectId: this.addQBForm.value.selSubjects,
      ChapterId: this.addQBForm.value.selChapters,
      TopicId: this.addQBForm.value.selTopics,
      SubTopicId: 0,
      HomeDisplay: this.addQBForm.value.homeDisplay,
    };
    if (this.selectedFile != null) {
      this.masterService
        .UploadQuestions(
          videoData,
          this.selectedFile,
          'QuestionBank',
          'UploadQuestions'
        )
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.router.navigate(['/questionbank']);
          } else {
            alert(data.message);
          }
        });
    } else {
      alert('Please select a file to upload');
    }
  }
}