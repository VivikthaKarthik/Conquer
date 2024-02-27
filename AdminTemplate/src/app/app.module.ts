import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './containers/side-bar/side-bar.component';
import { HeaderComponent } from './containers/header/header.component';
import { HeaderService } from './services/services/header-service.service';
import { HomeComponent } from './components/home/home.component';
import { NavigationHistoryComponent } from './widgets/navigation-history/navigation-history.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GridComponent } from './widgets/grid/grid.component';
import { CallvolumeComponent } from './components/callvolume/callvolume.component';
import { LoginComponent } from './components/login/login.component';
import { AgGridAngular } from 'ag-grid-angular';
import { AuthService } from './services/services/auth.service';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MasterpageComponent } from './masterpage/masterpage.component';

@NgModule({
  declarations: [AppComponent, SideBarComponent, HeaderComponent, HomeComponent, NavigationHistoryComponent, DashboardComponent, GridComponent, CallvolumeComponent, LoginComponent, MasterpageComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    AgGridAngular, 
    ReactiveFormsModule, 
    InputTextModule,
    ButtonModule,
    ToastModule,
    CardModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [HeaderService, AuthService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
