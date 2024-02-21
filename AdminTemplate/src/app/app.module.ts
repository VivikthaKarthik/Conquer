import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './containers/side-bar/side-bar.component';
import { HeaderComponent } from './containers/header/header.component';
import { HeaderService } from './services/services/header-service.service';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [AppComponent, SideBarComponent, HeaderComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [HeaderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
