import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from '../components/course/course.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button'; 
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
@NgModule({
  declarations: [CourseComponent,LayoutComponent,ConfirmdialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports:[
      SharedModule
  ]
})
export class LayoutModule { }
