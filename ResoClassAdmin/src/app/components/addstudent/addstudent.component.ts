import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { Course } from '../../models/course';
import { ListItem } from '../../models/listItem';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrl: './addstudent.component.css',
})
export class AddstudentComponent {
  studentForm!: FormGroup;
  studentName: string = '';
  courses: Course[] | undefined;
  states: ListItem[] = [{ id: 0, name: 'Select State' }];
  cities: ListItem[] = [{ id: 0, name: 'Select City' }];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private dataMappingService: DataMappingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
    this.getStates();
    this.studentForm = this.fb.group({
      // Define your form controls here
      admissionId: ['', Validators.required],
      admissionDate: ['', Validators.required],
      studentName: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      dateofBirth: ['', Validators.required],
      gender: [''],
      mobileNumber: ['', Validators.required],
      altMobileNumber: [''],
      email: [''],
      classId: [''],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      landMark: [''],
      // stateID: [''],
      // cityID: [''],
      pinCode: [''],

      // Add more controls as needed
    });
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

  getAllCourses() {
    this.masterService.getAll('Course', 'GetAll').subscribe((data: any) => {
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
    this.submitted = true;
    if (this.studentForm.invalid) {
      return;
    } else {
      this.saveStudent();
    }
  }
  saveStudent() {
    var objStudent = {
      AdmissionId: this.studentForm.value.admissionId,
      Name: this.studentForm.value.studentName,
      FatherName: this.studentForm.value.fatherName,
      MotherName: this.studentForm.value.motherName,
      DateOfBirth: this.studentForm.value.dateOfBirth,
      CourseId: this.studentForm.value.courseId,
      AdmissionDate: this.studentForm.value.admissionDate,
      MobileNumber: String(this.studentForm.value.mobileNumber),
      EmailAddress: this.studentForm.value.email,
      AlternateMobileNumber: String(this.studentForm.value.altMobileNumber),
      AddressLine1: this.studentForm.value.addressLine1,
      Gender: this.studentForm.value.gender,
      Landmark: this.studentForm.value.landMark,
      AddressLine2: this.studentForm.value.addressLine2,
      StateId: 1,
      CityId: 2,
      PinCode: this.studentForm.value.pinCode,
      Branchid: 'BRNCHOne',
      Password:'123'
      
    };
    console.log(JSON.stringify(objStudent));
    this.masterService
      .post(objStudent, 'Student', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.router.navigate(['/student']);
        } else {
          alert(data.message);
        }
      });
  }

  
}
