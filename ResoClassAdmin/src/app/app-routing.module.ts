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
