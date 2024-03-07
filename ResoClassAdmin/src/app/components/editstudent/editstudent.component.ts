import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrl: './editstudent.component.css'
})
export class EditstudentComponent {
  studentForm!: FormGroup;
  studentId: any;
  admissionId: string = "";
  studenrName: string = "";
  fatherName: string = "";
  motherName: string = "";
  dateOfBirth: Date = new Date()
  courseId: number = 0;
  admissionDate: Date = new Date();
  MobileNumber: string = "";
  EmailAddress: string = "";
  AlternateMobileNumber: string = "";
  AddressLine1: String = "";
  AddressLine2: String = "";
  Gender: string = "";
  landMark: string = "";
  stateId: number = 0;
  cityId: number = 0;
  pincode :string = "";
  submitted: boolean = false;

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,private router: Router,private route: ActivatedRoute,private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.editStudent(id);
    });
  }

  editStudent(cId: any) {
    this.courseId = cId;
    this.masterService
      .getById(cId, 'Course', 'Get')
      .subscribe((data: any) => {

        if (data.isSuccess) {
          if (data.result != null && data.result.name != null) {
            this.studenrName = data.result.name;
            this.admissionId= data.result.admissionId;
            this.fatherName= data.result.fatherName;
            this.motherName= data.result.motherName;
            this.dateOfBirth= data.result.dateOfBirth;
            this.courseId= data.result.courseId;
            this.admissionDate= data.result.admissionDate;
            this.MobileNumber= data.result.MobileNumber;
            this.EmailAddress= data.result.EmailAddress;
            this.AlternateMobileNumber= data.result.AlternateMobileNumber;
            this.AddressLine1= data.result.AddressLine1;
            this.AddressLine2= data.result.AddressLine2;
            this.Gender= data.result.Gender;
            this.landMark= data.result.landMark;
            this.stateId= data.result.stateId;
            this.cityId= data.result.cityId;
            this.pincode = data.result.pincode;
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

  updateStudent() {
    var objCourse = {
      id: this.studentId,
      AdmissionId: this.admissionId,
      Name: this.studenrName,
      FatherName: this.fatherName,
      MotherName: this.motherName,
      DateOfBirth: this.dateOfBirth,
      CourseId: this.courseId,
      AdmissionDate: this.admissionDate,
      MobileNumber: this.MobileNumber,
      EmailAddress: this.EmailAddress,
      AlternateMobileNumber: this.AlternateMobileNumber,
      AddressLine1: this.AddressLine1,
      Gender: this.Gender,
      Landmark: this.landMark,
      AddressLine2: this.AddressLine2,
      StateId: this.stateId,
      City: this.cityId
    }
    this.masterService.put(objCourse, 'Student', 'Update')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.router.navigate(['/student']);
        } else {
          alert(data.message);
        }
      });
     
  }

}
