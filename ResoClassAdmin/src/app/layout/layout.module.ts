import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from '../components/course/course.component';

import { SubjectComponent } from '../components/subject/subject.component';
import { ChaptersComponent } from '../components/chapters/chapters.component';
import { TopicsComponent } from '../components/topics/topics.component';
import { SubtopicsComponent } from '../components/subtopics/subtopics.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ConfirmdialogComponent,
    CourseComponent,
    SubjectComponent,
    ChaptersComponent,
    TopicsComponent,
    SubtopicsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    SharedModule
  ]
})
export class LayoutModule { }
