import { Component } from '@angular/core';
import { Student } from '../../models/student';
import { ColDef } from 'ag-grid-community';
import Swal from 'sweetalert2';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { Course } from '../../models/course';
import { Video } from '../../models/video';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css',
})
export class VideosComponent {
  videosList: Video[] = [];
  colDefs: ColDef[] = [];
  courseData: Course[] = [];

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private dialog: MatDialog,
    public notificationService: NotificationService,
    private router: Router
  ) {
    this.colDefs.push({
      headerName: 'Title',
      field: 'title',
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
      headerName: 'Chapter',
      field: 'chapter',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Topic',
      field: 'topic',
      filter: 'agTextColumnFilter',
    });

    this.colDefs.push({
      headerName: 'Sub Topic',
      field: 'subTopic',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Home Display',
      field: 'homeDisplay',
      filter: 'agTextColumnFilter',
    });
  }

  ngOnInit(): void {
    this.getAllVideos();
  }

  deleteStudent(cId: number) {
    this.masterService
      .delete(cId, 'Student', 'Delete')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllVideos();
        } else {
          alert(data.message);
        }
      });
  }
  getAllVideos() {
    this.masterService.getAll('Video', 'GetAll').subscribe((data: any) => {
      if (data.isSuccess) {
        this.videosList = data.result;
      } else {
        alert(data.message);
      }
    });
  }

  showConfirmation(id: any): void {
    Swal.fire({
      text: 'Do you really want to remove this Student?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteStudent(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  // Event handler for file input change event
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
  }

  editGridRecord(id: any) {
    this.router.navigate(['/editstudent'], { queryParams: { id: id } });
  }

  deleteGridRecord(id: any) {
    this.showConfirmation(id);
  }
}
