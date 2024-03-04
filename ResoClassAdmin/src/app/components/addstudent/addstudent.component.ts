import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { Course } from '../../models/course';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrl: './addstudent.component.css'
})
export class AddstudentComponent {
  form: FormGroup;
  studentName: string = "";
  courses: Course[] | undefined;
 

  constructor(private fb: FormBuilder, private masterService: MasterService, private dataMappingService: DataMappingService, private router: Router) {
    this.form = this.fb.group({
      // Define your form controls here
      admissionId: ['',],
      admissionDate: [''],
      studentName: [''],
      fatherName: [''],
      motherName: [''],
      dateofBirth: [''],
      gender: [''],
      mobileNumber: [''],
      altMobileNumber: [''],
      email: [''],
      classId: [''],
      addressLine1: [''],
      addressLine2: [''],
      landMark: [''],
      stateID: [''],
      cityID: [''],
      pinCode: [''],


      // Add more controls as needed
    });
  }

  ngOnInit(): void {
    this.getAllCourses();

  }

  getAllCourses() {
    debugger
    this.masterService.getAll('Course', 'GetAll')
      .subscribe((data: any) => {
        debugger
        if (data.isSuccess) {
          this.courses = this.dataMappingService.mapToModel<Course>(
            data.result,
            (item) => ({
              id: item.id,
              name: item.name,
              thumbnail: item.thumbnail,
            })
          );
        } else {
          alert(data.message);
        }
      });
  }


  onSubmit() {

    var objStudent = {
      AdmissionId: this.form.value.admissionId,
      Name: this.form.value.studenrName,
      FatherName: this.form.value.fatherName,
      MotherName: this.form.value.motherName,
      DateOfBirth: this.form.value.dateOfBirth,
      CourseId: this.form.value.courseId,
      AdmissionDate: this.form.value.admissionDate,
      MobileNumber: this.form.value.MobileNumber,
      EmailAddress: this.form.value.EmailAddress,
      AlternateMobileNumber: this.form.value.AlternateMobileNumber,
      AddressLine1: this.form.value.AddressLine1,
      Gender: this.form.value.Gender,
      Landmark: this.form.value.landMark,
      AddressLine2: this.form.value.AddressLine2,
      StateId: this.form.value.stateId,
      City: this.form.value.cityId
    }
    this.masterService.post(objStudent, 'Student', 'Create')
      .subscribe((data: any) => {
        debugger
        if (data.isSuccess) {
          this.router.navigate(['/student']);
        } else {
          alert(data.message);
        }
      });

  }
}
