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
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';
import { Subject } from '../../models/subject';
import { Chapters } from '../../models/chapters';
import { Topic } from '../../models/topic';
import { SubTopic } from '../../models/subtopics';
import { ListItem } from '../../models/listItem';

@Component({
  selector: 'app-editvideo',
  templateUrl: './editvideo.component.html',
  styleUrl: './editvideo.component.css',
})
export class EditvideoComponent {
  editVideoForm!: FormGroup;
  videoTitle: string = '';
  courses: Course[] | undefined;
  subjects: Subject[] | undefined;
  chapters: Chapters[] | undefined;
  topics: Topic[] | undefined;
  subTopics: SubTopic[] | undefined;

  id: number = 0;
  title: string = '';
  thumbnail: string = '';
  description: string = '';
  sourceUrl: string = '';
  chapter: string = '';
  topic: string = '';
  subTopic: string = '';
  homeDisplay: boolean = false;
  submitted = false;
  selectedOption: any;
  selectedCity: any;
  videoId: number = 0;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCourses();
    this.route.queryParams.subscribe((params) => {
      debugger;
      const id: string = params['id'];
      this.videoId = 0;
      this.editVideo(id);
    });

    this.editVideoForm = this.fb.group({
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
    this.masterService
      .getById(Id, 'Subject', 'GetSubjectsByCourseId', 'courseId')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.subjects = this.dataMappingService.mapToModel<Subject>(
            data.result,
            (item) => ({
              id: item.id,
              name: item.name,
              class: item.class,
              course: item.course,
              colorCode: item.colorCode,
            })
          );
        } else {
          alert(data.message);
        }
      });
  }

  getChaptersBySubjectId(Id: number) {
    this.masterService
      .getById(Id, 'Chapters', 'GetChaptersBySubjectId', 'subjectId')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.chapters = this.dataMappingService.mapToModel<Chapters>(
            data.result,
            (item) => ({
              id: item.id,
              name: item.name,
              thumbnail: item.thumbnail,
              subjectId: item.subjectId,
            })
          );
        } else {
          alert(data.message);
        }
      });
  }
  getTopicsByChapterId(Id: number) {
    this.masterService
      .getById(Id, 'Topic', 'GetTopicsByChapterId', 'topicId')
      .subscribe((data: any) => {
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
    this.masterService
      .getById(Id, 'SubTopic', 'GetSubTopicsByTopicId', 'subTopicId')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.subTopics = this.dataMappingService.mapToModel<SubTopic>(
            data.result,
            (item) => ({
              id: item.id,
              name: item.name,
              thumbnail: item.thumbnail,
              TopicId: item.TopicId,
            })
          );
        } else {
          alert(data.message);
        }
      });
  }

  editVideo(Id: string) {
    debugger;
    this.videoId = parseInt(Id);
    this.masterService
      .getById(Id, 'Video', 'Get', 'videoId')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          if (data.result != null && data.result.name != null) {
            this.id = data.result.id;
            this.title = data.result.title;
            this.thumbnail = data.result.thumbnail;
            this.description = data.result.description;
            this.sourceUrl = data.result.sourceUrl;
            this.chapter = data.result.chapter;
            this.topic = data.result.topic;
            this.subTopic = data.result.subTopic;
            this.homeDisplay = data.result.homeDisplay;
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
    if (this.editVideoForm.invalid) {
      return;
    } else {
      this.updateVideo();
    }
  }
  updateVideo() {
    var videoData = {
      title: this.editVideoForm.value.title,
      thumbnail: this.editVideoForm.value.thumbnail,
      description: this.editVideoForm.value.description,
      sourceUrl: this.editVideoForm.value.sourceUrl,
      Course: this.editVideoForm.value.selCourses,
      Subject: this.editVideoForm.value.selSubjects,
      Chapter: this.editVideoForm.value.selChapters,
      Topic: this.editVideoForm.value.selTopics,
      SubTopic: this.editVideoForm.value.selSubTopics,
      HomeDisplay: this.editVideoForm.value.homeDisplay,
    };
    console.log(JSON.stringify(videoData));
    this.masterService
      .put(videoData, 'Video', 'Update')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.router.navigate(['/videos']);
        } else {
          alert(data.message);
        }
      });
  }
}
