import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { MainHeaderComponent } from './main-header/main-header.component';

import { CallvolumeComponent } from './components/callvolume/callvolume.component';
import { UserComponent } from './components/user/user.component';
import { AgGridAngular } from 'ag-grid-angular';
import { DefaultFooterComponent } from './containers/default-layouts/default-footer/default-footer.component';
import { DefaultHeaderComponent } from './containers/default-layouts/default-header/default-header.component';
import { DefaultLayoutsComponent } from './containers/default-layouts/default-layouts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PageNotFoundComponent,
    MainHeaderComponent,
    CallvolumeComponent,
    UserComponent,
    DefaultFooterComponent,
    DefaultHeaderComponent,
    DefaultLayoutsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    BrowserAnimationsModule,
    AgGridAngular
  ],
  providers: [AuthService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
