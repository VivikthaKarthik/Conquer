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

@Component({
  selector: 'app-questionbank',
  templateUrl: './questionbank.component.html',
  styleUrl: './questionbank.component.css',
})
export class QuestionbankComponent {
  questionList: any[] = [];
  questionbankForm!: FormGroup;
  videoTitle: string = '';
  courses: ListItem[] | undefined;
  subjects: ListItem[] | undefined;
  chapters: ListItem[] | undefined;
  topics: ListItem[] | undefined;
  subTopics: ListItem[] | undefined;

  courseId: number = 0;
  subjectId: number = 0;
  chapterId: number = 0;
  topicId: number = 0;
  subTopicId: number = 0;

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
    this.questionbankForm = this.fb.group({
      selCourses: ['', Validators.required],
      selSubjects: ['', Validators.required],
      selChapters: ['', Validators.required],
      selTopics: [''],
      selSubTopics: [''],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.questionbankForm.invalid) {
      return;
    } else {
      this.getAllQuestions();
    }
  }
  getAllQuestions() {
    var questionData = {
      courseId: this.questionbankForm.value.selCourses,
      subjectId: this.questionbankForm.value.selSubjects,
      chapterId: this.questionbankForm.value.selChapters,
      topicId: this.questionbankForm.value.selTopics,
      subTopicId: 0,
    };
    this.masterService
      .getAllByObject(questionData, 'Assessment', 'GetAllQuestions')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.questionList = data.result;
        } else {
          alert(data.message);
        }
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
  deleteQuestion(id: number) {
    if (id > 0) {
      var data = [];
      data.push(id);
      this.masterService
        .post(data, 'Assessment', 'DeleteQuestions')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.getAllQuestions();
          } else {
            alert(data.message);
          }
        });
    }
  }

  deleteAllQuestions() {
    var data = this.questionList.map(({ id }) => id);
    this.masterService
      .post(data, 'Assessment', 'DeleteQuestions')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllQuestions();
        } else {
          alert(data.message);
        }
      });
  }
  // getSubTopicsByTopicId(Id: number) {
  //   this.topicId = Id;
  //   this.masterService.getById(Id, 'SubTopic', 'GetSubTopicsByTopicId', 'subTopicId').subscribe((data: any) => {
  //     if (data.isSuccess) {
  //       this.subTopics = this.dataMappingService.mapToModel<SubTopic>(
  //         data.result,
  //         (item) => ({
  //           id: item.id,
  //           name: item.name,
  //           thumbnail: item.thumbnail,
  //           TopicId: item.TopicId
  //         })
  //       );

  //     } else {
  //       alert(data.message);
  //     }
  //   });
  // }
}
