import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { DataMappingService } from '../../services/data-mapping.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course';
import { ListItem } from '../../models/listItem';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.css'
})
export class EdituserComponent {
  editUserForm!: FormGroup;
  studentName: string = "";
  courses: Course[] | undefined;
  submitted = false;
  rolesData: ListItem[] = [];
  branchData: ListItem[] = [];
  userId: number = 0;


  constructor(private fb: FormBuilder,private route: ActivatedRoute, private masterService: MasterService, private dataMappingService: DataMappingService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.getRoles();
    this.getBranches();

    this.route.queryParams.subscribe(params => {
     
      const id:string = params['id'];
      this.userId = 0;
      this.getUserDetails(id);
    });


    this.editUserForm = this.fb.group({
      
      firstName: ['', Validators.required],
      lastName: [''],
      role: ['', Validators.required],
      email: ['', Validators.required],
      branch: ['', Validators.required],
      password:['', Validators.required],
      phoneNumber:['', Validators.required],
    });
  }

  getUserDetails(Id:string) {
    debugger
    this.userId = parseInt(Id);
    this.masterService
      .getById(Id, 'User', 'Get','studentId')
      .subscribe((data: any) => {

        if (data.isSuccess) {
          if (data.result != null && data.result.name != null) {
            this.editUserForm.controls.firstName.setValue(data.result.firstName);
            this.editUserForm.controls.lastName.setValue(data.result.lastName);
            this.editUserForm.controls.role.setValue(data.result.role);
            this.editUserForm.controls.email.setValue(data.result.email);
            this.editUserForm.controls.branch.setValue(data.result.branch);
            this.editUserForm.controls.password.setValue(data.result.password);
            this.editUserForm.controls.phoneNumber.setValue(data.result.phoneNumber);
            
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
    if (this.editUserForm.invalid) {
      return;
    } else {
      this.updateUser();
    }
  }

  updateUser() {

    var userData = {
      firstName: this.editUserForm.controls.firstName.value,
      lastName: this.editUserForm.controls.lastName.value,
      role: this.editUserForm.controls.role.value,
      email: this.editUserForm.controls.email.value,
      branch: this.editUserForm.controls.branch.valid,
      password:this.editUserForm.controls.password.valid,
      phoneNumber:this.editUserForm.controls.phoneNumber.valid,
    }
    this.masterService.post(userData, 'User', 'Put')
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

