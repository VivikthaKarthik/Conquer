import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Chapters } from '../../models/chapters';
import { DataMappingService } from '../../services/data-mapping.service';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Course } from '../../models/course';
import { Subject } from '../../models/subject';
import { NotificationService } from '../../services/notification.service';
import { Topic } from '../../models/topic';
import { ColDef } from 'ag-grid-community';
import {
  Form,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { SubTopic } from '../../models/subtopics';
declare var $: any;

@Component({
  selector: 'app-subtopics',
  templateUrl: './subtopics.component.html',
  styleUrl: './subtopics.component.css',
})
export class SubtopicsComponent {
  topicsList: Topic[] = [];
  subTopicsList: any[] = [];
  chapters: Chapters[] = [];
  topics: Topic[] = [];
  topicName: string = '';
  subTopicName: string = '';
  description: string = '';
  topicId: number = 0;
  chapterId: number = 0;
  courseData: Course[] = [];
  subjectData: Subject[] = [];
  selectedOption: string = '';
  thumbnail: string = '';
  selectedFile: File | undefined;
  showBulkUploadButton: boolean = false;
  imageUrl: string | undefined;
  isChecked: boolean = false;
  isAddPopupVisible: boolean = true;
  selectedValue: any;
  colDefs: ColDef[] = [];
  subTopicForm!: FormGroup;
  submitted: boolean = false;
  selectedId: number = 0;
  subTopicId: number = 0;
  pageName: string = 'SubTopic';

  OnDocumentUpload(event: any): void {
    this.getAllSubTopics();
  }

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private dialog: MatDialog,
    public notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    {
      this.colDefs.push({
        headerName: 'ID',
        field: 'id',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Name',
        field: 'name',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Thumbnail',
        field: 'thumbnail',
        filter: 'agTextColumnFilter',
        cellRenderer: function (params: any) {
          if (params && params.value) {
            return `<img src="${params.value}" style="max-height: 100px; max-width: 100px;" />`;
          } else {
            return null;
          }
        },
      });
      this.colDefs.push({
        headerName: 'Description',
        field: 'description',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Source Url',
        field: 'sourceUrl',
        filter: 'agTextColumnFilter',
        cellRenderer: function (params: any) {
          if (params && params.value) {
            return `<a href="${params.value}">Video</a>`;
          } else {
            return null;
          }
        },
      });
      this.colDefs.push({
        headerName: 'Topic',
        field: 'topic',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Chapter',
        field: 'chapter',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Subject',
        field: 'subject',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Class',
        field: 'class',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Course',
        field: 'course',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Home Display',
        field: 'homeDisplay',
        filter: 'agTextColumnFilter',
      });
    }
    // Reactive-Form validations
    {
      this.subTopicForm = this.fb.group({
        name: ['', Validators.required],
        topicId: ['', Validators.required],
        thumbnail: ['', Validators.required],
      });
    }
  }

  showMessage() {
    this.notificationService.addNotification('Chapter Saved Successfully!.');
  }
  onSelectChange(event: any) {
    // Read the selected value
    this.chapterId = this.selectedValue;
  }
  ngOnInit(): void {
    this.getAllSubTopics();
  }
  getAllSubTopics() {
    this.masterService.getAll('SubTopic', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.subTopicsList = data.result;
      } else {
        alert(data.message);
      }
    });
  }
  getAllTopics() {
    this.masterService.getAll('Topic', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.topicsList = data.result;
      } else {
        alert(data.message);
      }
    });
  }

  getSubTopicById(Id: any) {
    this.getAllChapters();
    this.subTopicId = Id;
    this.masterService.getById(Id, 'SubTopic', 'Get').subscribe((data: any) => {
      if (data.isSuccess) {
        if (data.result != null && data.result.name != null) {
          this.topicName = data.result.name;
          this.selectedOption = data.result.topicId;
          this.thumbnail = data.result.thumbnail;
          this.description = data.result.description;
          ($('#edit_topic') as any).modal('show');
        } else {
          alert('Some error occured..! Plaese try again');
        }
      } else {
        alert(data.message);
      }
    });
  }

  createSubTopic() {
    debugger;
    var subTopic = {
      name: this.topicName,
      topicId: this.chapterId,
    };
    this.masterService
      .postWithFile(subTopic, this.selectedFile, 'SubTopic', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllChapters();
          // ($('#add_chapter') as any).modal('hide');
          this.showMessage();
        } else {
          alert(data.message);
        }
      });
    this.isAddPopupVisible = false;

    window.location.reload();
  }

  updateTopic() {
    var objCourse = {
      id: this.topicId,
      name: this.topicName,
      topicId: this.selectedOption,
    };
    if (this.selectedFile != null) {
      this.masterService
        .put(objCourse, 'SubTopic', 'Update')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.getAllTopics();
          } else {
            alert(data.message);
          }
        });
    } else {
      this.masterService
        .putWithFile(objCourse, this.selectedFile, 'SubTopic', 'Update')
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.getAllTopics();
          } else {
            alert(data.message);
          }
        });
    }

    this.isAddPopupVisible = false;
    window.location.reload();
  }

  deleteTopic(cId: any) {
    this.masterService
      .delete(cId, 'SubTopic', 'Delete')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllTopics();
        } else {
          alert(data.message);
        }
      });
    window.location.reload();
  }

  showConfirmation(id: any): void {
    Swal.fire({
      text: 'Do you really want to remove this Sub-Topic/class?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteTopic(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  // Event handler for file input change event
  onFileSelected(event: any): void {
    if (event.target.files !== undefined && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.showBulkUploadButton = true;
    } else {
      this.selectedFile = undefined;
      this.showBulkUploadButton = false;
    }
  }

  getAllChapters() {
    this.masterService.getAll('Chapter', 'GetAll').subscribe((data: any) => {
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

  editGridRecord(id: any) {
    this.getSubTopicById(id);
  }

  deleteGridRecord(id: any) {
    this.showConfirmation(id);
  }

  onSubmit() {
    this.submitted = true;
    if (this.subTopicForm.invalid) {
      return;
    } else {
      this.createSubTopic();
    }
  }

  closeModal() {
    ($('#edit_topic') as any).modal('hide');
  }
}
