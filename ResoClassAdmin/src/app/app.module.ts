import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { MasterService } from './services/master.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { LayoutModule } from './layout/layout.module';
import { NotificationComponent } from './notification/notification.component';
import { UsersComponent } from './components/users/users.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { GridComponent } from './components/grid/grid.component';
import { ActionCellRendererComponent } from './components/action-cell-renderer/action-cell-renderer.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DynamicbuttoncellrenderComponent } from './components/dynamicbuttoncellrender/dynamicbuttoncellrender.component';
import { AddchapterComponent } from './components/addchapter/addchapter.component';
import { EditchapterComponent } from './components/editchapter/editchapter.component';
import { AddtopicComponent } from './components/addtopic/addtopic.component';
import { EdittopicComponent } from './components/edittopic/edittopic.component';
import { AddsubtopicComponent } from './components/addsubtopic/addsubtopic.component';
import { EditsubtopicComponent } from './components/editsubtopic/editsubtopic.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotificationComponent,
    UsersComponent,
    AdduserComponent,
    EdituserComponent,
    ActionCellRendererComponent,
    DynamicbuttoncellrenderComponent,
    NotFoundComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
  ],
  exports: [LayoutModule],
  providers: [
    AuthService,
    MasterService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
