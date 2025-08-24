import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule ,ReactiveFormsModule , FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;
  showPassword: boolean = false;
  isLogin: boolean = true;

  constructor(private fb: FormBuilder ,private router:Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  setActiveTab(isLogin: boolean): void {
    this.isLogin = isLogin;
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login Form Data:', this.loginForm.value);
    }
    this.loginForm.reset();
    this.router.navigate(['/'])
    
  }

  onSignupSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Signup Form Data:', this.signupForm.value);
    }
    this.signupForm.reset();
  }
}
