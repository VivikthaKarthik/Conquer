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
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course';
import { ListItem } from '../../models/listItem';


@Component({
  selector: 'app-editsubtopic',
  templateUrl: './editsubtopic.component.html',
  styleUrl: './editsubtopic.component.css'
})
export class EditsubtopicComponent {

  editSubTopicForm!: FormGroup;
  subtopicId: number = 0;
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

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    debugger
    this.getCourses();
    this.getClsByCourseId(0);
    this.getSubByClsID(0);
    this.getChapterBySubID(0);
    this.getTopicByChapterID(0);

    this.route.queryParams.subscribe((params) => {
      const id: string = params['id'];
      this.subtopicId = parseInt(id);
      this.getSubTopicsById(this.subtopicId);
    });


    this.editSubTopicForm = this.fb.group({

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
      rating: ['', Validators.required],
      thumbnail: [''],
      description: ['', Validators.required],
      homeDispaly: [''],

    });
  }

  getSubTopicsById(Id: number) {
    debugger
    this.subtopicId = Id;
    this.masterService
      .getById(Id, 'SubTopic', 'Get')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          if (data.result != null && data.result.name != null) {

            this.selectedImageURL = data.result.thumbnail;
            this.editSubTopicForm.controls.name.setValue(data.result.name);
            this.editSubTopicForm.controls.sourceURL.setValue(data.result.sourceUrl);
            this.editSubTopicForm.controls.description.setValue(data.result.description);
            this.editSubTopicForm.controls.homeDispaly.setValue(data.result.homeDispaly);
            this.editSubTopicForm.controls.duration.setValue(data.result.duration);
            this.editSubTopicForm.controls.selSubId.setValue(data.result.subjectId);
            this.editSubTopicForm.controls.selTopicId.setValue(data.result.topicId);
            this.editSubTopicForm.controls.selChapterId.setValue(data.result.chapterId);
            this.editSubTopicForm.controls.classNotesURL.setValue(data.result.classNotesUrl);
            this.editSubTopicForm.controls.extractURL.setValue(data.result.extractUrl);
            this.editSubTopicForm.controls.rating.setValue(data.result.rating);
            this.selectedFile = data.result.thumbnail;
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
    debugger
    this.submitted = true;
    if (this.editSubTopicForm.invalid) {
      return;
    } else {
      this.updateSubTopic();
    }
  }
  updateSubTopic() {
    debugger
    var stData = {
      id: this.subtopicId,
      name: this.editSubTopicForm.value.name,
      sourceURL: this.editSubTopicForm.value.sourceURL,
      duration: this.editSubTopicForm.value.duration,
      selCourseId: this.editSubTopicForm.value.selCourseId,
      selClassId: this.editSubTopicForm.value.selClassId,
      selSubId: this.editSubTopicForm.value.selSubId,
      selChapterId: this.editSubTopicForm.value.selChapterId,
      selTopicId: this.editSubTopicForm.value.selTopicId,
      classNotesURL: this.editSubTopicForm.value.classNotesURL,
      extractURL: this.editSubTopicForm.value.extractURL,
      rating: this.editSubTopicForm.value.rating,
      thumbnail: this.editSubTopicForm.value.thumbnail,
      description: this.editSubTopicForm.value.description,
      homeDispaly: this.editSubTopicForm.value.homeDispaly,

    };
    if (this.selectedFile !== undefined) {
      this.masterService
        .putWithFile(stData, this.selectedFile, 'SubTopic', 'Update')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.router.navigate(['/subtopic']);
          } else {
            alert(data.message);
          }
        });

    } else {
      this.masterService
        .put(stData, 'SubTopic', 'Update')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.router.navigate(['/subtopic']);
          } else {
            alert(data.message);
          }
        });
    }
   
  }

  OnDocumentUpload(event: any): void {
    this.router.navigate(['/subtopic']);
  }
}
