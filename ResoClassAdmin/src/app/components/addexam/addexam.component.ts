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
import { Subject } from '../../models/subject';
import { timeInterval } from 'rxjs';


@Component({
  selector: 'app-addexam',
  templateUrl: './addexam.component.html',
  styleUrl: './addexam.component.css'
})
export class AddexamComponent {
  examsForm!: FormGroup;
  studentName: string = '';
  courseData: ListItem[] = [];
  subjectData: ListItem[] = [];
  selSubjectId: number = 0;
  submitted = false;
  selectedOption: any;
  selectedCity: any;
  pageName: string = 'Student';
  selectedFile: File | undefined;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCourses();

    this.examsForm = this.fb.group({
      // Define your form controls here
      examname: ['', Validators.required],
      examstartdate: ['', Validators.required],
      examstarttime: ['', Validators.required],
      examenddate: ['', [Validators.required, this.endDateTimeValidator]],
      examendtime: ['', Validators.required],
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
  mobileNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^[0-9]{10}$/.test(control.value);
      return valid ? null : { invalidMobileNumber: { value: control.value } };
    };
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onSubmit() {
    this.submitted = true;
    if (this.examsForm.invalid) {
      return;
    } else {
      this.saveExam();
    }
  }

  getDateTime(date:any,time:any): Date | null {
    const dateValue = date;
    const timeValue = time;

    if (dateValue && timeValue) {
      const [hours, minutes] = timeValue.split(':').map(Number);
      const dateTime = new Date(dateValue);
      dateTime.setHours(hours);
      dateTime.setMinutes(minutes);
      return dateTime;
    }

    return null;
  }
  saveExam() {
  
    var dt = this.getDateTime(this.examsForm.value.examstartdate,this.examsForm.value.examendtime);
    var examData = {
      name: this.examsForm.value.examname,
      startDate: this.getDateTime(this.examsForm.value.examstartdate,this.examsForm.value.examstarttime),
      endDate: this.getDateTime(this.examsForm.value.examenddate,this.examsForm.value.examendtime),
      marksPerQuestion: this.examsForm.value.questionmarks,
      negativeMarksPerQuestion: this.examsForm.value.negativemarks,
      maxAllowedTime: this.examsForm.value.maxtimeallowed,
      courseId: this.examsForm.value.selCourseId,
      subjectId: this.selSubjectId,
      

    };
    if (this.selectedFile != null) {
      this.masterService
        .UploadQuestions(
          examData,
          this.selectedFile,
          'ScheduledExam',
          'CreateExam'
        )
        .subscribe((data: any) => {
          if (data.isSuccess) {
            this.router.navigate(['/exams']);
          } else {
            alert(data.message);
          }
        });
    } else {
      alert('Please select a file to upload');
    }

  }

  OnDocumentUpload(event: any): void {
    this.router.navigate(['/exams']);
  }

  
}
