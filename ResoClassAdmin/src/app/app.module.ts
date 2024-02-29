import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { MasterService } from './services/master.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SubjectComponent } from './components/subject/subject.component';

import { LayoutModule } from './layout/layout.module';


@NgModule({
  declarations: [AppComponent, LoginComponent, SubjectComponent],
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
  providers: [AuthService, MasterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
