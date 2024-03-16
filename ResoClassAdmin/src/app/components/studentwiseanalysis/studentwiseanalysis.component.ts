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
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-studentwiseanalysis',
  templateUrl: './studentwiseanalysis.component.html',
  styleUrl: './studentwiseanalysis.component.css',
})
export class StudentwiseanalysisComponent {
  analysisForm!: FormGroup;
  videoTitle: string = '';
  courses: ListItem[] | undefined;
  student: ListItem[] | undefined;
  assesmentList: Chapters[] = [];
  selStudentId: number = 0;
  colDefs: ColDef[] = [];
  showButton: boolean = true;

  submitted = false;
  selectedOption: any;
  selectedCity: any;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private router: Router
  ) {
    {
      this.colDefs.push({
        headerName: 'Practice Session',
        field: 'practiceSession',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Practiced On',
        field: 'practicedOn',
        filter: 'agTextColumnFilter',
      });
      this.colDefs.push({
        headerName: 'Score',
        field: 'score',
        filter: 'agTextColumnFilter',
      });

      this.colDefs.push({
        headerName: 'Attempted Questions',
        field: 'attemptedQuestions',
        filter: 'agTextColumnFilter',
      });

      this.colDefs.push({
        headerName: '',
        maxWidth: 120,
        resizable: false,
        filter: false,
        cellRenderer: function (params: any) {
          return `<button class="btn btn-sm btn-success" type="button" onclick="viewAnalysis()">View Analysis</button>`;
        },
      });
    }
  }
  viewAnalysis() {
    alert('ViewAnalysis');
    this.router.navigate(['/viewanalysis']);
  }

  ngOnInit(): void {
    this.getCourses();

    this.analysisForm = this.fb.group({
      selCourses: ['', Validators.required],
      selStudent: ['', Validators.required],
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

  getStudentByCourse(Id: number) {
    if (Id !== undefined) {
      this.masterService
        .getListItems('Student', 'Course', Id)
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.student = this.dataMappingService.mapToModel<ListItem>(
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
  getStudentID(Id: number) {
    this.selStudentId = Id;
  }

  onSubmit() {
    this.getStudentAnalysis(this.selStudentId);
  }

  getStudentAnalysis(Id: number) {
    this.masterService
      .getAssessmentsByStudentId(Id, 'Assessment', 'GetAssessmentsByStudentId')
      .subscribe((data: any) => {
        debugger;
        if (data.isSuccess) {
          debugger;
          this.assesmentList = data.result;
        } else {
          alert(data.message);
        }
      });
  }

  editGridRecord(id: any) {}

  deleteGridRecord(id: any) {}
}
