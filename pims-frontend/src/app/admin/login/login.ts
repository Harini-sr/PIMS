import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
loginForm!: FormGroup;
  id: any;
  title: any;
  category: any;
  language: any;
  author: any;
  location: any;
  quantity: any;
  errorMessage: any;
 
  constructor(
    private router: Router,
   /*  private service: Service, */
    private http: HttpClient
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
      ]),
      password: new FormControl('', Validators.required),
      //  role: new FormControl('', Validators.required),
    });
  }
  isLoading = false;
 
  addDetails() {
    this.isLoading = true;
    if (this.loginForm.invalid) return;
 
    this.http
      .post<any>(
        'https://backend-67bg.onrender.com/loginApi/login',
        this.loginForm.value
      )
      .subscribe({
        next: (res) => {
          console.log('Login response:', res);
 
          const role = res.user.role || 'user';
          localStorage.setItem('role', role);
          localStorage.setItem('user', JSON.stringify(res.user));
          /*  alert('Login successful!'); */
 
          if (role === 'admin') {
            if (this.router.url !== '/dashboard') {
              this.router.navigate(['/dashboard']);
            }
          } else {
            if (this.router.url !== '/user-dashboard') {
              this.router.navigate(['/user-dashboard']);
            }
          }
        },
        error: (err) => {
          alert('Login failed!');
          console.error('Login error:', err);
          this.errorMessage = 'Invalid username or password';
        },
      });
  }
 
  reset() {
    this.loginForm.reset();
  }
}
