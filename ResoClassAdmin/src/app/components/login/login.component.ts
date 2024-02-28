import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this._router.navigate(['home']);
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
        if (res != null && res.isSuccess === true) {
          this.auth.setToken(res.result);
          this._router.navigateByUrl('course');
        } else {
          alert('Invalid Credentials');
          // this.messageService.add({
          //   severity: 'error',
          //   summary: 'Error',
          //   detail: 'Invalid Credentials',
          // });
        }
      },
      error: (err) => {
        alert('Invalid Credentials');
        console.log(err);
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Error',
        //   detail: 'Invalid Credentials',
        // });
      },
    });
  }
}
