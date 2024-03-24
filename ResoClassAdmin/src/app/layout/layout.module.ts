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
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { GridComponent } from '../components/grid/grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsComponent } from '../components/students/students.component';
import { AddstudentComponent } from '../components/addstudent/addstudent.component';
import { EditstudentComponent } from '../components/editstudent/editstudent.component';
import { DropdownComponent } from '../widgets/dropdown/dropdown.component';
import { Select2Module } from 'ng-select2-component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { HomeComponent } from '../components/home/home.component';
import { VideosComponent } from '../components/videos/videos.component';
import { AddvideosComponent } from '../components/addvideos/addvideos.component';
import { EditvideoComponent } from '../components/editvideo/editvideo.component';
import { QuestionbankComponent } from '../components/questionbank/questionbank.component';
import { AddquestionbankComponent } from '../components/addquestionbank/addquestionbank.component';
import { BulkUploadComponent } from '../widgets/bulk-upload/bulk-upload.component';
import { ImageUploadComponent } from '../widgets/image-upload/image-upload.component';
import { StudentwiseanalysisComponent } from '../components/studentwiseanalysis/studentwiseanalysis.component';
import { ViewanalysisComponent } from '../components/viewanalysis/viewanalysis.component';
import { ExamsComponent } from '../components/exams/exams.component';
import { ExamresultsComponent } from '../components/examresults/examresults.component';
import { AddexamComponent } from '../components/addexam/addexam.component';
import { EditexamComponent } from '../components/editexam/editexam.component';
import { ViewpaperComponent } from '../components/viewpaper/viewpaper.component';
import { ViewresultsComponent } from '../components/viewresults/viewresults.component';
import { DesignationsComponent } from '../components/designations/designations.component';
import { ClassComponent } from '../components/class/class.component';
import { AddsubjectComponent } from '../components/addsubject/addsubject.component';
import { EditsubjectComponent } from '../components/editsubject/editsubject.component';
import { AddchapterComponent } from '../components/addchapter/addchapter.component';
import { EditchapterComponent } from '../components/editchapter/editchapter.component';
import { AddtopicComponent } from '../components/addtopic/addtopic.component';
import { EdittopicComponent } from '../components/edittopic/edittopic.component';
import { AddsubtopicComponent } from '../components/addsubtopic/addsubtopic.component';
import { EditsubtopicComponent } from '../components/editsubtopic/editsubtopic.component';
import { TextboxComponent } from '../widgets/textbox/textbox.component';
import { TextareaComponent } from '../widgets/textarea/textarea.component';
import { AddclassComponent } from '../components/addclass/addclass.component';
import { EditclassComponent } from '../components/editclass/editclass.component';
import { UsersComponent } from '../components/users/users.component';
import { AdduserComponent } from '../components/adduser/adduser.component';
import { EdituserComponent } from '../edituser/edituser.component';


@NgModule({
  declarations: [
    LayoutComponent,
    ConfirmdialogComponent,
    CourseComponent,
    SubjectComponent,
    ChaptersComponent,
    TopicsComponent,
    SubtopicsComponent,
    GridComponent,
    StudentsComponent,
    AddstudentComponent,
    EditstudentComponent,
    DropdownComponent,
    LoaderComponent,
    HomeComponent,
    VideosComponent,
    AddvideosComponent,
    EditvideoComponent,
    QuestionbankComponent,
    AddquestionbankComponent,
    BulkUploadComponent,
    ImageUploadComponent,
    StudentwiseanalysisComponent,
    ViewanalysisComponent,
    ExamsComponent,
    ExamresultsComponent,
    AddexamComponent,
    EditexamComponent,
    ViewpaperComponent,
    ViewresultsComponent,
    DesignationsComponent,
    ClassComponent,
    AddsubjectComponent,
    EditsubjectComponent,
    AddchapterComponent,
    EditchapterComponent,
    AddtopicComponent,
    EdittopicComponent,
    AddsubtopicComponent,
    EditsubtopicComponent,
   TextboxComponent,
   TextareaComponent,
   AddclassComponent,
   EditclassComponent,
   UsersComponent,
   AdduserComponent,
   EdituserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    AgGridAngular,
    AgGridModule,
    ReactiveFormsModule,
    Select2Module,
  ],
  exports: [SharedModule],
})
export class LayoutModule {}
