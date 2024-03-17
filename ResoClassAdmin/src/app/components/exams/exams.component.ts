import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Chapters } from '../../models/chapters';
import { DataMappingService } from '../../services/data-mapping.service';
import { ConfirmdialogComponent } from '../../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Course } from '../../models/course';
import { Subject } from '../../models/subject';
import { Student } from '../../models/student';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { Exams } from '../../models/Exams';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.css'
})
export class ExamsComponent {

  examsList: Exams[] = [];
  examId: any;
  subjectData: Subject[] = [];
  selectedOption: any;
  selSubjectId: number | undefined;
  selectedFile: File | undefined;
  showBulkUploadButton: boolean = false;
  imageUrl: string | undefined;
  isChecked: boolean = false;
  isAddPopupVisible: boolean = true;
  colDefs: ColDef[] = [];

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private dialog: MatDialog,
    public notificationService: NotificationService,
    private router: Router
  ) {
    this.colDefs.push({
      headerName: 'Exam Name',
      field: 'name',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Exam Start Time',
      field: 'startDate',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Exam End Time',
      field: 'endDate',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Marks for Each Question',
      field: 'marksPerQuestion',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Marks for Negative Marking',
      field: 'negativeMarksPerQuestion',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Max Allowed Time if Late (Mins)',
      field: 'maxAllowedTime',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Class/Course',
      field: 'course',
      filter: 'agTextColumnFilter',
    });
    this.colDefs.push({
      headerName: 'Subject',
      field: 'subject',
      filter: 'agTextColumnFilter',
    });
    
  }
  ngOnInit(): void {
    this.getAllExams();
  }
  getAllExams() {
    this.masterService.getAll('ScheduledExam', 'GetScheduledExams').subscribe((data: any) => {
      if (data.isSuccess) {
        this.examsList = data.result;
      } else {
        alert(data.message);
      }
    });
  }
  getExamsById(id: any) {
    this.router.navigate(['/viewpaper'], { queryParams: { id: id } });
  }
  editGridRecord(id: any) {
    this.getExamsById(id);
  }

  deleteGridRecord(id: any) {
    this.showConfirmation(id);
  }

  viewQuestionPaper(id: any) {
    this.getExamsById(id);
  }

  showConfirmation(id: any): void {
    Swal.fire({
      text: 'Do you really want to remove this Exams?',
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteExams(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  deleteExams(Id: number) {
    this.masterService
      .delete(Id, 'ScheduledExam', 'Delete')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.getAllExams();
        } else {
          alert(data.message);
        }
      });
  }
}
