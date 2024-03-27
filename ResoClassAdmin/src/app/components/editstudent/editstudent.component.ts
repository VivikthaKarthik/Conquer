import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { ListItem } from '../../models/listItem';


@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrl: './editstudent.component.css'
})
export class EditstudentComponent {
  studentForm!: FormGroup;
  studentId: number = 0;
  courseData:ListItem[] = [{ id: 0, name: 'Select Course' }];
  classData:ListItem[] = [{ id: 0, name: 'Select Class' }];
  submitted: boolean = false;
  selectedOption: any;
  selectedCity:any;
  courses: Course[] = [];
  states: ListItem[] = [{ id: 0, name: 'Select State' }];
  cities: ListItem[] = [{ id: 0, name: 'Select City' }];

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,private router: Router,private route: ActivatedRoute,private fb: FormBuilder
  ) { }

  ngOnInit() {
    
    this.getCourses();
    this.getClsByCourseId(0);
    this.getStates();
    this.route.queryParams.subscribe(params => {
     
      const id:string = params['id'];
      this.studentId = 0;
      this.editStudent(id);
    });

    
    this.studentForm = this.fb.group({
      // Define your form controls here
      admissionId: ['', Validators.required],
      admissionDate: ['', Validators.required],
      studentName: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      dateofBirth: ['', Validators.required],
      gender: [''],
      mobileNumber: ['', [Validators.required, this.mobileNumberValidator()]],
      altMobileNumber: ['', [Validators.required, this.mobileNumberValidator()]],
      email: [''],
      courseId: ['', Validators.required],
      classId: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      landMark: [''],
      stateId: [''],
      cityId: [''],
      pinCode: [''],
      studentId:['']

      // Add more controls as needed
    });
  }

  editStudent(cId:string) {
    debugger
    this.studentId = parseInt(cId);
    this.masterService
      .getById(cId, 'Student', 'Get','studentId')
      .subscribe((data: any) => {

        if (data.isSuccess) {
          if (data.result != null && data.result.name != null) {
            this.studentForm.controls.studentName.setValue(data.result.name);
            this.studentForm.controls.admissionId.setValue(data.result.admissionId);
            this.studentForm.controls.fatherName.setValue(data.result.fatherName);
            this.studentForm.controls.motherName.setValue(data.result.motherName);
            this.studentForm.controls.dateofBirth.setValue(data.result.dateOfBirth);
            this.studentForm.controls.courseId.setValue(data.result.courseId);
            this.studentForm.controls.classId.setValue(data.result.classId);
            this.studentForm.controls.admissionDate.setValue(data.result.admissionDate);
            this.studentForm.controls.mobileNumber.setValue(data.result.mobileNumber);
            this.studentForm.controls.email.setValue(data.result.emailAddress);
            this.studentForm.controls.altMobileNumber.setValue(data.result.alternateMobileNumber);
            this.studentForm.controls.addressLine1.setValue(data.result.addressLine1);
            this.studentForm.controls.addressLine2.setValue(data.result.addressLine2);
            this.studentForm.controls.gender.setValue(data.result.gender);
            this.studentForm.controls.landMark.setValue(data.result.landmark);
            this.studentForm.controls.stateId.setValue(data.result.stateId);
            this.studentForm.controls.cityId.setValue(data.result.cityId);
            this.studentForm.controls.pinCode.setValue(data.result.pinCode);
          }
          else {
            alert('Some error occured..! Plaese try again');
          }
        } else {
          alert(data.message);
        }
      });
  }

  onSubmit() {
   
    this.submitted = true;
    if (this.studentForm.invalid) {

      return
    }
    else {
      this.updateStudent();
    }
  }

  getStates() {
    this.masterService.getListItems('state', '', 0).subscribe((data: any) => {
      if (data.isSuccess) {
        var list = this.dataMappingService.mapToModel<ListItem>(
          data.result,
          (item) => ({
            id: item.id,
            name: item.name,
          })
        );
        this.states = this.states.concat(list);
      } else {
        alert(data.message);
      }
    });
  }
  updateStudent() {
    debugger
    var studentData = {
      id: this.studentId,
      AdmissionId: this.studentForm.controls.admissionId,
      Name: this.studentForm.controls.studentName,
      FatherName:  this.studentForm.controls.fatherName,
      MotherName:  this.studentForm.controls.motherName,
      DateOfBirth: this.studentForm.controls.dateofBirth,
      CourseId: this.studentForm.controls.courseId,
      ClassId:this.studentForm.controls.classId,
      AdmissionDate: this.studentForm.controls.admissionDate,
      MobileNumber: this.studentForm.controls.mobileNumber,
      EmailAddress: this.studentForm.controls.emailAddress,
      AlternateMobileNumber: this.studentForm.controls.alternateMobileNumber,
      AddressLine1: this.studentForm.controls.addressLine1,
      Gender: this.studentForm.controls.addressLine2,
      Landmark: this.studentForm.controls.landMark,
      AddressLine2: this.studentForm.controls.landMark,
      StateId: this.studentForm.controls.stateId,
      City:  this.studentForm.controls.cityId,
      PinCode:this.studentForm.controls.pinCode,
      BranchId:'1000001',
      Password:'123'
    }
    this.masterService.put(studentData, 'Student', 'Update')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.router.navigate(['/student']);
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
  getCities(stateId: any) {
    
    this.masterService
      .getListItems('city', 'state', stateId)
      .subscribe((data: any) => {
        if (data.isSuccess) {
          var list = this.dataMappingService.mapToModel<ListItem>(
            data.result,
            (item) => ({
              id: item.id,
              name: item.name,
            })
          );
          this.cities = this.cities.concat(list);
        } else {
          alert(data.message);
        }
      });
  }
  onStateChange(selectedId: any) {
    this.getCities(selectedId);
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
    else{
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
  mobileNumberValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const valid = /^[0-9]{10}$/.test(control.value);
      return valid ? null : { 'invalidMobileNumber': { value: control.value } };
    };
  }
}
