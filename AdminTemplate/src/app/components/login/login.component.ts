import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/services/auth.service';
import { LoginModel } from '../../models/loginModel';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this._router.navigate(['']);
    }
  }

  get userName() {
    return this.loginForm.controls['userName'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  onLoginSubmit() {
    const postData = { ...this.loginForm.value };
    this.auth.login(postData).subscribe({
      next: (res) => {
        if (res.token != null) {
          this.auth.setToken(res.token);
          this._router.navigateByUrl('/callvolume');
        } else {
          // alert('Invalid Credentials');
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Invalid Credentials',
          });
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid Credentials',
        });
      },
    });
  }
}
