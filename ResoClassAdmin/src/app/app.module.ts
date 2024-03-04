import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { MasterService } from './services/master.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { LayoutModule } from './layout/layout.module';
import { NotificationComponent } from './notification/notification.component';
import { StudentsComponent } from './components/students/students.component';
import { AddstudentComponent } from './components/addstudent/addstudent.component';
import { EditstudentComponent } from './components/editstudent/editstudent.component';
import { UsersComponent } from './components/users/users.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ActionsrenderComponent } from './actionsrender/actionsrender.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, NotificationComponent, StudentsComponent, AddstudentComponent, EditstudentComponent, UsersComponent, AdduserComponent, EdituserComponent, ActionsrenderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ],
  exports: [LayoutModule],
  providers: [AuthService, MasterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
