import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { Router } from '@angular/router';
import { Course } from '../../models/course';
import { ListItem } from '../../models/listItem';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent {

  addUserForm!: FormGroup;
  studentName: string = "";
  courses: Course[] | undefined;
  submitted = false;
  rolesData: ListItem[] = [];
  branchData: ListItem[] = [];


  constructor(private fb: FormBuilder, private masterService: MasterService, private dataMappingService: DataMappingService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.getRoles();
    this.getBranches();

    this.addUserForm = this.fb.group({
      
      firstName: ['', Validators.required],
      lastName: [''],
      role: ['', Validators.required],
      email: ['', Validators.required],
      branch: ['', Validators.required],
      password:['', Validators.required],
      phoneNumber:['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      return;
    } else {
      this.saveUser();
    }
  }

  saveUser() {

    var userData = {
      firstName: this.addUserForm.value.firstName,
      lastName: this.addUserForm.value.lastName,
      role: this.addUserForm.value.role,
      email: this.addUserForm.value.email,
      branch: this.addUserForm.value.branch,

    }
    this.masterService.post(userData, 'User', 'Create')
      .subscribe((data: any) => {
        if (data.isSuccess) {
          this.router.navigate(['/user']);
        } else {
          alert(data.message);
        }
      });

  }

  getRoles() {
    this.masterService.getListItems('Role', '', 0).subscribe((data: any) => {
      if (data.isSuccess) {
        this.rolesData = this.dataMappingService.mapToModel<ListItem>(
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
  getBranches() {
    this.masterService.getListItems('Branch', '', 0).subscribe((data: any) => {
      if (data.isSuccess) {
        this.branchData = this.dataMappingService.mapToModel<ListItem>(
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
