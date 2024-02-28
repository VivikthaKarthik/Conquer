import { Component, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  expandSidebar: boolean = false;
  constructor(
    private auth: AuthService,
    private _router: Router,
    private headerService: HeaderService,
    private renderer: Renderer2
  ) {}

  logout() {
    this.auth.logout();
  }

  toggleSideBar() {
    if (this.expandSidebar) {
      this.renderer.removeClass(document.body, 'mini-sidebar');
      this.expandSidebar = false;
    } else {
      this.expandSidebar = true;
      this.renderer.addClass(document.body, 'mini-sidebar');
    }
  }
}
