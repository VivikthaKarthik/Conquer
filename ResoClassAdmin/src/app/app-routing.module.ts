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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    // pathMatch: 'full',
    children: [
      {
        path: 'course',
        component: CourseComponent,
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
        path: 'editstudent',
        component: EditstudentComponent,
      },
    ],
  },
  // {
  //   path: 'header',
  //   component: HeaderComponent,
  // },
  // {
  //   path: 'sidebar',
  //   component: SidebarComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
