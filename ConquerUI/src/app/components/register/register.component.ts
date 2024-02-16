import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  token: any;

  constructor() {
    this.token = localStorage.getItem('authToken');
  }
}
