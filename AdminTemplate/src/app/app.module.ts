import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './containers/side-bar/side-bar.component';
import { HeaderComponent } from './containers/header/header.component';
import { HeaderService } from './services/services/header-service.service';
import { HomeComponent } from './components/home/home.component';
import { NavigationHistoryComponent } from './widgets/navigation-history/navigation-history.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GridComponent } from './widgets/grid/grid.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [AppComponent, SideBarComponent, HeaderComponent, HomeComponent, NavigationHistoryComponent, DashboardComponent, GridComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [HeaderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
