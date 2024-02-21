import { Component } from '@angular/core';
import { HeaderService } from '../../services/services/header-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private headerService: HeaderService) {}

  addToggle() {
    this.headerService.toggleSideBar();
  }
}
