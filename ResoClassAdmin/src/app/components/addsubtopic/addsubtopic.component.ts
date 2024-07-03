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
import { Attachments } from '../../models/attachments';
import { ColDef } from 'ag-grid-community';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addsubtopic',
  templateUrl: './addsubtopic.component.html',
  styleUrl: './addsubtopic.component.css',
})
export class AddsubtopicComponent {
  addSubTopicForm!: FormGroup;
  addAttachmentForm!: FormGroup;
  studentName: string = '';
  selectedFile: File | undefined;
  selectedFiles: File | undefined;
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
  isChecked: boolean = false;
  attachmentsList: Attachments[] = [];
  colDefs: ColDef[] = [];
  isAddPopupVisible: boolean = true;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private router: Router
  ) {
    this.colDefs.push({
      headerName: 'Name',
      field: 'name',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Source Url',
      field: 'sourceUrl',
      filter: 'agTextColumnFilter',
    });
  }

  ngOnInit(): void {
    this.isChecked = true;
    this.getCourses();
    this.getAllAttachments();

    this.addSubTopicForm = this.fb.group({
      name: ['', Validators.required],
      sourceURL: ['', Validators.required],
      duration: ['', Validators.required],
      selCourseId: ['', Validators.required],
      selClassId: ['', Validators.required],
      selSubId: ['', Validators.required],
      selChapterId: ['', Validators.required],
      selTopicId: ['', Validators.required],
      classNotesURL: [''],
      extractURL: [''],
      // rating: ['', Validators.required],
      // thumbnail: [''],
      // description: ['', Validators.required],
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
    } else {
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
    } else {
      this.masterService
        .getListItems('Subject', '', 0)
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
    } else {
      this.masterService
        .getListItems('Chapter', '', 0)
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
    } else {
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

  onSelectedFiles(event: any): void {
    if (event !== undefined) {
      this.selectedFiles = event;

      this.masterService
        .postAttachment(1, this.selectedFile)
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.attachmentsList = data.result;
          } else {
            alert(data.message);
          }
        });
    }
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
      Thumbnail: '',
      Description: '',
      HomeDisplay: this.addSubTopicForm.value.HomeDisplay,
    };
    console.log(JSON.stringify(objST));
    this.masterService
      .post(objST, 'SubTopic', 'Create')
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
  showConfirmation(id: any): void {
    Swal.fire({
      text: 'Do you really want to remove this Student?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAttachments(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
  deleteAttachments(cId: number) {
    this.masterService
      .delete(cId, 'SubTopic', 'DeleteAttachment')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllAttachments();
        } else {
          alert(data.message);
        }
      });
  }
  getAllAttachments() {
    this.masterService
      .getAll('SubTopic', 'GetAttachments')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.attachmentsList = data.result;
        }
      });
  }

  downLoadRow(id: any) {}

  deleteGridRecord(id: any) {
    this.showConfirmation(id);
  }

  addAttachments() {
    this.isAddPopupVisible = true;
  }
}
