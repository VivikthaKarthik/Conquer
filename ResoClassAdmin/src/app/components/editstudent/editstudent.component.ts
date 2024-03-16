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
    
    this.getAllCourses();
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
      courseId: [''],
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
            this.studenrName = data.result.name;
            this.admissionId= data.result.admissionId;
            this.fatherName= data.result.fatherName;
            this.motherName= data.result.motherName;
            this.dateOfBirth= data.result.dateOfBirth;
            this.courseId= data.result.courseId;
            this.admissionDate= data.result.admissionDate;
            this.MobileNumber= data.result.mobileNumber;
            this.EmailAddress= data.result.emailAddress;
            this.AlternateMobileNumber= data.result.alternateMobileNumber;
            this.AddressLine1= data.result.addressLine1;
            this.AddressLine2= data.result.addressLine2;
            this.Gender= data.result.gender;
            this.landMark= data.result.landmark;
            this.stateId= data.result.stateId;
            this.cityId= data.result.cityId;
            this.pincode = data.result.pinCode;
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
      City: this.cityId,
      PinCode:this.pincode,
      BranchId:'1',
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

  mobileNumberValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const valid = /^[0-9]{10}$/.test(control.value);
      return valid ? null : { 'invalidMobileNumber': { value: control.value } };
    };
  }
}
