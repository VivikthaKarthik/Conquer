import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
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
  styleUrl: './questionbank.component.css'
})
export class QuestionbankComponent {
  questionList: any[] = [];
  questionbankForm!: FormGroup;
  videoTitle: string = '';
  courses: Course[] | undefined;
  subjects: Subject[] | undefined;
  chapters: Chapters[] | undefined;
  topics: Topic[] | undefined;
  subTopics: SubTopic[] | undefined;

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
  ) { }

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
    var questionaData = {
      courseId: this.courseId,
      subjectId: this.subjectId,
      chapterId: this.chapterId,
      topicId: this.topicId,
      subTopicId: this.subTopicId,
      

    };
    this.masterService.getAllByObject(questionaData,'Assessment', 'GetAllQuestions').subscribe((data: any) => {
      if (data.isSuccess) {
        this.questionList = data.result;
      } else {
        alert(data.message);
      }
    });
  }
  getCourses() {
    this.masterService.getAll('Course', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.courses = this.dataMappingService.mapToModel<Course>(
          data.result,
          (item) => ({
            id: item.id,
            name: item.name,
            thumbnail: item.thumbnail,
          })
        );
      } else {
        alert(data.message);
      }
    });
  }

  getSubjectsByCourseId(Id: number) {
    debugger
    this.courseId = Id;
    this.masterService.getById(Id, 'Subject', 'GetSubjectsByCourseId', 'courseId').subscribe((data: any) => {
      if (data.isSuccess) {
        debugger
        this.subjects = this.dataMappingService.mapToModel<Subject>(
          data.result,
          (item) => ({
            id: item.id,
            name: item.name,
            thumbnail: item.thumbnail,
          })
        );

      } else {
        alert(data.message);
      }
    });
  }

  getChaptersBySubjectId(Id: number) {
    this.subjectId = Id;
    this.masterService.getById(Id, 'Chapter', 'GetChaptersBySubjectId', 'subjectId').subscribe((data: any) => {
      if (data.isSuccess) {
        debugger
        this.chapters = this.dataMappingService.mapToModel<Chapters>(
          data.result,
          (item) => ({
            id: item.id,
            name: item.name,
            thumbnail: item.thumbnail,
            subjectId: item.subjectId
          })
        );

      } else {
        alert(data.message);
      }
    });
  }
  getTopicsByChapterId(Id: number) {
    this.chapterId = Id;
    this.masterService.getById(Id, 'Topic', 'GetTopicsByChapterId', 'topicId').subscribe((data: any) => {
      if (data.isSuccess) {
        debugger
        this.topics = this.dataMappingService.mapToModel<Topic>(
          data.result,
          (item) => ({
            id: item.id,
            name: item.name,
            thumbnail: item.thumbnail,
            chapter: item.chapter,
            description: item.description,
          })
        );

      } else {
        alert(data.message);
      }
    });
  }

  getSubTopicsByTopicId(Id: number) {
    this.topicId = Id;
    this.masterService.getById(Id, 'SubTopic', 'GetSubTopicsByTopicId', 'subTopicId').subscribe((data: any) => {
      if (data.isSuccess) {
        this.subTopics = this.dataMappingService.mapToModel<SubTopic>(
          data.result,
          (item) => ({
            id: item.id,
            name: item.name,
            thumbnail: item.thumbnail,
            TopicId: item.TopicId
          })
        );

      } else {
        alert(data.message);
      }
    });
  }


}
