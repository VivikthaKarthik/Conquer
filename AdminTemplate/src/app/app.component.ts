import { Component, ViewChild } from '@angular/core';
import { SideBarComponent } from './containers/side-bar/side-bar.component';
import { HeaderService } from './services/services/header-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AdminTemplate';
  status = false;
  subscription: Subscription | undefined;
  constructor(private headerService: HeaderService) {}

  addToggle() {
    this.status = !this.status;
  }

  ngOnInit() {
    this.subscription = this.headerService
      .get()
      .subscribe((sideNav) => (this.status = sideNav));
  }
}
