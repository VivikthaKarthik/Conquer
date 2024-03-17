import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { Course } from '../../models/course';
import { ListItem } from '../../models/listItem';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editexam',
  templateUrl: './editexam.component.html',
  styleUrl: './editexam.component.css'
})
export class EditexamComponent {
  selSubjectId: number = 0;
  selectedOption: any;
  courseData: ListItem[] = [];
  subjectData: ListItem[] = [];
  editExamForm!: FormGroup;
  examId: number = 0;
  examname: string = "";
  examstartdate:Date = new Date();
  examstarttime: string = "";
  examenddate:Date = new Date();
  examendtime: string = "";
  questionmarks: string = "";
  negativemarks: string = "";
  maxtimeallowed: string = "";
  selCourseId: string = "";
  selSubId: String = "";
  uploadquestionpaper: String = "";
  submitted: boolean = false;
  selectedFile: File | undefined;
  

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,private router: Router,private route: ActivatedRoute,private fb: FormBuilder
  ) { }

  ngOnInit() {
    
    this.getAllCourses();
   
    this.route.queryParams.subscribe(params => {
     
      const id:string = params['id'];
      this.examId = 0;
      this.editExam(parseInt(id
      ));
    });

    
    this.editExamForm = this.fb.group({
      // Define your form controls here
      examname: ['', Validators.required],
      examstartdate: ['', Validators.required],
      examstarttime: ['', Validators.required],
      examenddate: ['', [Validators.required, this.endDateTimeValidator]],
      examendtime: ['', [Validators.required, this.endTimeValidator]],
      questionmarks: [''],
      negativemarks: [''],
      maxtimeallowed: [''],
      selCourseId: [''],
      selSubId: [''],
      uploadquestionpaper: ['', Validators.required],

    });
  }

  endDateTimeValidator(control: AbstractControl): ValidationErrors | null {
    const startDateTimeControl = control.parent?.get('examstartdate');
    if (!startDateTimeControl) return null; 
  
    const startDateTime = new Date(startDateTimeControl.value);
    const endDateTime = new Date(control.value);
    
    if (endDateTime < startDateTime) {
      return { 'endDateTimeInvalid': true };
    }
    
    return null;
  }

  endTimeValidator(control: AbstractControl): ValidationErrors | null {
    const startTime = control.get('examstarttime')?.value;
    const endTime = control.get('examendtime')?.value;
  
    return startTime && endTime && startTime < endTime ? null : { 'endTimeInvalid': true };
    
  }


  editExam(id:number) {
    debugger
    
    this.masterService
      .getById(id, 'ScheduledExam', 'Get','')
      .subscribe((data: any) => {

        if (data.isSuccess) {
          if (data.result != null && data.result.name != null) {
            this.examname = data.result.examname;
            this.examstartdate= data.result.examstartdate;
            this.examstarttime= data.result.examstarttime;
            this.examenddate= data.result.examenddate;
            this.examendtime= data.result.examendtime;
            this.questionmarks= data.result.questionmarks;
            this.negativemarks= data.result.negativemarks;
            this.maxtimeallowed= data.result.maxtimeallowed;
            this.selCourseId= data.result.selCourseId;
            this.selSubId= data.result.selSubId;
            this.uploadquestionpaper= data.result.uploadquestionpaper;
            
          }
          else {
            alert('Some error occured..! Plaese try again');
          }
        } else {
          alert(data.message);
        }
      });
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onSubmit() {
   
    this.submitted = true;
    if (this.editExamForm.invalid) {

      return
    }
    else {
      this.updatExam();
    }
  }
  getAllCourses() {
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

  getSubByCourseID(Id: number) {
    if (Id !== undefined) {
      this.masterService
        .getListItems('Subject', 'Course', Id)
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
  }

  
  updatExam() {
    debugger
    var examData = {
      id: this.examId,
      ExamName: this.examname,
      ExamStartDate: this.examstartdate,
      ExamStartTime: this.examstarttime,
      ExamEndDate: this.examenddate,
      ExamEndtime: this.examendtime,
      Questionmarks: this.questionmarks,
      NegativeMarks: this.negativemarks,
      Maxtimeallowed: this.maxtimeallowed,
      Course: this.selCourseId,
      Subject: this.selSubId,
      Uploadquestionpaper: this.uploadquestionpaper,
      
    }
   
    this.masterService.put(examData, 'ScheduledExam', 'Update')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.router.navigate(['/exams']);
        } else {
          alert(data.message);
        }
      });
     
  }
 

}

