import { Component } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrl: './editstudent.component.css'
})
export class EditstudentComponent {
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

  constructor(
    private masterService: MasterService,
    private dataMappingService: DataMappingService,private router: Router,private route: ActivatedRoute
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
          }
          else {
            alert('Some error occured..! Plaese try again');
          }
        } else {
          alert(data.message);
        }
      });
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
