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
import { Router } from '@angular/router';
import {
  Form,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent {
  topicsList: Topic[] = [];
  chapters: Chapters[] = [];
  topicName: string = '';
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
  topicForm!: FormGroup;
  submitted: boolean = false;
  selectedId: number = 0;
  pageName: string = 'Topic';

  OnDocumentUpload(event: any): void {
    this.getAllTopics();
  }

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private dialog: MatDialog,
    public notificationService: NotificationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    {
      // this.colDefs.push({
      //   headerName: 'ID',
      //   field: 'id',
      //   filter: 'agTextColumnFilter',
      // });
      this.colDefs.push({
        headerName: 'Topic',
        field: 'name',
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
    this.getAllTopics();
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

  
  deleteTopic(cId: any) {
    this.masterService.delete(cId, 'Topic', 'Delete').subscribe((data: any) => {
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
      text: 'Do you really want to remove this Topic/class?',
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



  editGridRecord(Id: any) {
    this.router.navigate(['/edittopic'], { queryParams: { id: Id } });
  }


  deleteGridRecord(id: any) {
    this.showConfirmation(id);
  }

  
}
