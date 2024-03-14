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
  selector: 'app-addvideos',
  templateUrl: './addvideos.component.html',
  styleUrl: './addvideos.component.css'
})
export class AddvideosComponent {
  addVideoForm!: FormGroup;
  videoTitle: string = '';
  courses: Course[] | undefined;
  subjects: Subject[] | undefined;
  chapters: Chapters[] | undefined;
  topics: Topic[] | undefined;
  subTopics: SubTopic[] | undefined;

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

    this.addVideoForm = this.fb.group({

      title: ['', Validators.required],
      description: ['', Validators.required],
      thumbnail: ['', Validators.required],
      sourceUrl: ['', Validators.required],
      selCourses: ['', Validators.required],
      selSubjects: ['', Validators.required],
      selChapters: ['', Validators.required],
      selTopics: ['', Validators.required],
      selSubTopics: ['', Validators.required],
      homeDisplay: [''],
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
    this.masterService.getById(Id, 'Subject', 'GetSubjectsByCourseId', 'courseId').subscribe((data: any) => {
      if (data.isSuccess) {
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
    this.masterService.getById(Id, 'Chapters', 'GetChaptersBySubjectId', 'subjectId').subscribe((data: any) => {
      if (data.isSuccess) {
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
    this.masterService.getById(Id, 'Topic', 'GetTopicsByChapterId', 'topicId').subscribe((data: any) => {
      if (data.isSuccess) {
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

  onSubmit() {
    this.submitted = true;
    if (this.addVideoForm.invalid) {
      return;
    } else {
      this.uploadVideo();
    }
  }
  uploadVideo() {

    var videoData = {
      title: this.addVideoForm.value.title,
      thumbnail: this.addVideoForm.value.thumbnail,
      description: this.addVideoForm.value.description,
      sourceUrl: this.addVideoForm.value.sourceUrl,
      Course: this.addVideoForm.value.selCourses,
      Subject: this.addVideoForm.value.selSubjects,
      Chapter: this.addVideoForm.value.selChapters,
      Topic: this.addVideoForm.value.selTopics,
      SubTopic: this.addVideoForm.value.selSubTopics,
      HomeDisplay: this.addVideoForm.value.homeDisplay,

    };
    console.log(JSON.stringify(videoData));
    this.masterService
      .post(videoData, 'Video', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.router.navigate(['/videos']);
        } else {
          alert(data.message);
        }
      });
  }

}
