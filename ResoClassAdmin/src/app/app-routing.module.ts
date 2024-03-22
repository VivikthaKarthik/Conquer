import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CourseComponent } from './components/course/course.component';
import { SubjectComponent } from './components/subject/subject.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { TopicsComponent } from './components/topics/topics.component';
import { SubtopicsComponent } from './components/subtopics/subtopics.component';
import { StudentsComponent } from './components/students/students.component';
import { AddstudentComponent } from './components/addstudent/addstudent.component';
import { EditstudentComponent } from './components/editstudent/editstudent.component';
import { UsersComponent } from './components/users/users.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VideosComponent } from './components/videos/videos.component';
import { AddvideosComponent } from './components/addvideos/addvideos.component';
import { EdituserComponent } from './edituser/edituser.component';
import { EditvideoComponent } from './components/editvideo/editvideo.component';
import { QuestionbankComponent } from './components/questionbank/questionbank.component';
import { AddquestionbankComponent } from './components/addquestionbank/addquestionbank.component';
import { StudentwiseanalysisComponent } from './components/studentwiseanalysis/studentwiseanalysis.component';
import { ViewanalysisComponent } from './components/viewanalysis/viewanalysis.component';
import { ExamsComponent } from './components/exams/exams.component';
import { AddexamComponent } from './components/addexam/addexam.component';
import { ViewpaperComponent } from './components/viewpaper/viewpaper.component';
import { ExamresultsComponent } from './components/examresults/examresults.component';
import { ViewresultsComponent } from './components/viewresults/viewresults.component';
import { DesignationsComponent } from './components/designations/designations.component';
import { ClassComponent } from './components/class/class.component';
import { AddsubjectComponent } from './components/addsubject/addsubject.component';
import { EditsubjectComponent } from './components/editsubject/editsubject.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    // pathMatch: 'full',
    children: [
      {
        path: '',
        component: CourseComponent,
      },
      {
        path: 'course',
        component: CourseComponent,
      },
      {
        path: 'class',
        component: ClassComponent,
      },
      {
        path: 'subject',
        component: SubjectComponent,
      },
      {
        path: 'chapter',
        component: ChaptersComponent,
      },
      {
        path: 'topic',
        component: TopicsComponent,
      },
      {
        path: 'subtopic',
        component: SubtopicsComponent,
      },
      {
        path: 'student',
        component: StudentsComponent,
      },
      {
        path: 'addstudent',
        component: AddstudentComponent,
      },
      {
        path: 'editstudent',
        component: EditstudentComponent,
      },
      {
        path: 'user',
        component: UsersComponent,
      },
      {
        path: 'adduser',
        component: AdduserComponent,
      },
      {
        path: 'editUser',
        component: EdituserComponent,
      },
      {
        path: 'videos',
        component: VideosComponent,
      },
      {
        path: 'addvideo',
        component: AddvideosComponent,
      },
      {
        path: 'editvideo',
        component: EditvideoComponent,
      },
      {
        path: 'questionbank',
        component: QuestionbankComponent,
      },
      {
        path: 'addquestionbank',
        component: AddquestionbankComponent,
      },
      {
        path: 'studentwiseanalysis',
        component: StudentwiseanalysisComponent,
      },
      {
        path: 'viewanalysis',
        component: ViewanalysisComponent,
      },
      {
        path: 'exams',
        component: ExamsComponent,
      },
      {
        path: 'addexam',
        component: AddexamComponent,
      },
      {
        path: 'viewpaper',
        component: ViewpaperComponent,
      },
      {
        path: 'examresult',
        component: ExamresultsComponent,
      },
      {
        path: 'viewresult',
        component: ViewresultsComponent,
      },
      {
        path: 'designations',
        component: DesignationsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'addsubject',
        component: AddsubjectComponent,
      },
      {
        path: 'editsubject',
        component: EditsubjectComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
