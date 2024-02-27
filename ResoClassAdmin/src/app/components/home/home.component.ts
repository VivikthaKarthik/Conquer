import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private auth: AuthService, private _router: Router) {}
  logout() {
    this.auth.logout();
  }

  NavigateToCourse() {
    this._router.navigate(['course']);
  }

  NavigateToSubject() {
    this._router.navigate(['subject']);
  }
}
