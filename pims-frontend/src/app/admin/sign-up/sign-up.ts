import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {

  /* sign up form for user  */
    signUpForm!: FormGroup;
    isLoading = true;
constructor(private http:HttpClient, private router:Router){
     this.signUpForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
      ]),
      spassword: new FormControl('',[
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

      ]),
      email: new FormControl('', [
        Validators.required, 
        Validators.email
       ]),
       phone: new FormControl('', [
        Validators.required, 
        Validators.pattern('^\\+?[0-9]{10,15}$'),
       ]),

    });
}



 signUpFormSub(){
console.log(this.signUpForm);
  const formData = {
      username: this.signUpForm.value.name,
      password: this.signUpForm.value.spassword,
      email: this.signUpForm.value.email,
      phone: this.signUpForm.value.phone
    };

    this.http.post('http://localhost:3000/register', formData)
      .subscribe({
        next: (res) => {
          console.log('✅ Registered successfully:', res);
          alert('User registered successfully!');
          this.signUpForm.reset();
          this.router.navigate(['/login']); 
        },
        error: (err) => {
          console.error('❌ Registration failed:', err);
          alert(err.error?.message || 'Registration failed');
        
        }
      });
  
 }

moveLogin() {
  this.router.navigate(['/login']); 
}
reset(){
  this.signUpForm.reset()
}
}
