import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { Course } from '../../models/course';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent {

  form: FormGroup;
  studentName: string = "";
  courses: Course[] | undefined;
 

  constructor(private fb: FormBuilder, private masterService: MasterService, private dataMappingService: DataMappingService, private router: Router) {
    this.form = this.fb.group({
      // Define your form controls here
      firstName: ['',],
      lastName: [''],
      role: [''],
      email: [''],
      
    });
  }

  onSubmit() {

    var objStudent = {
      FirstName: this.form.value.firstName,
      LastName: this.form.value.lastName,
      Role: this.form.value.role,
      Email: this.form.value.email,
      
    }
    this.masterService.post(objStudent, 'User', 'Create')
      .subscribe((data: any) => {
        debugger
        if (data.isSuccess) {
          this.router.navigate(['/user']);
        } else {
          alert(data.message);
        }
      });

  }

}
