

// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
// // import { RouterModule, Router } from '@angular/router';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatInputModule } from '@angular/material/input';
// // import { MatSelectModule } from '@angular/material/select';
// // import { MatButtonModule } from '@angular/material/button';
// // import { ApiService } from '../service/api';
// // import * as AOS from 'aos'; // Import AOS
// // import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
// // import { MatNativeDateModule } from '@angular/material/core';

// // // import * as jwt_decode from 'jwt-decode';
// // @Component({
// //   selector: 'app-issue-form',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     ReactiveFormsModule,
// //     RouterModule,
// //     MatFormFieldModule,
// //     MatInputModule,
// //     MatSelectModule,
// //     MatButtonModule,MatDatepickerModule,MatNativeDateModule
// //   ],
// //   templateUrl: './issue-form.html',
// //   styleUrls: ['./issue-form.css']
// // })
// // export class IssueFormComponent implements OnInit {
// //   form: FormGroup;
// //   submitting = false;

// //   constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
// //     this.form = this.fb.group({
// //       name: ['', Validators.required],
// //       email: ['', [Validators.required, Validators.email]],
// //       issueType: ['', Validators.required],
// //       description: ['', Validators.required],
// //       location: ['', Validators.required],
// //       date: ['', Validators.required] // New field

// //     });
// //   }

// //   ngOnInit() {
// //     AOS.init({ duration: 1000, once: true }); // Initialize AOS
// //   }

  
// //     submit() {
// //   if (this.form.invalid) {
// //     this.form.markAllAsTouched();
// //     return;
// //   }

// //   const token = localStorage.getItem('token');
// //   if (!token) {
// //     alert('User not logged in. Please login to submit an issue.');
// //     return;
// //   }

// //   // const decoded: any = (jwt_decode as any).default(token);
// //   const userId = 'http://localhost:3000/login';

// //   if (!userId) {
// //     alert('Invalid user token. Please login again.');
// //     return;
// //   }

// //     this.submitting = true;

// //     const payload = {
// //        userId,
// //       name: this.form.value.name.trim(),
// //       email: this.form.value.email.trim(),
// //       issueType: this.form.value.issueType.trim(),
// //       description: this.form.value.description.trim(),
// //       location: this.form.value.location.trim(),
// //       date: this.form.value.date

// //     };

// //     this.api.createIssue(payload).subscribe({
// //       next: _ => {
// //         this.submitting = false;
// //         alert('Issue submitted successfully!');
// //         this.router.navigate(['/user/dashboard']);
// //       },
// //       error: err => {
// //         this.submitting = false;
// //         console.error('Issue submit error', err);
// //         alert('Failed to submit issue. See console for details.');
// //       }
// //     });
// //   }

// //   cancel() {
// //     this.router.navigate(['/user/dashboard']);
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { RouterModule, Router } from '@angular/router';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { ApiService } from '../service/api';
// import * as AOS from 'aos'; // Import AOS
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';

// @Component({
//   selector: 'app-issue-form',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     RouterModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatButtonModule,
//     MatDatepickerModule,
//     MatNativeDateModule
//   ],
//   templateUrl: './issue-form.html',
//   styleUrls: ['./issue-form.css']
// })
// export class IssueFormComponent implements OnInit {
//   form: FormGroup;
//   submitting = false;

//   constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
//     this.form = this.fb.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       issueType: ['', Validators.required],
//       description: ['', Validators.required],
//       location: ['', Validators.required],
//       date: ['', Validators.required] // New field
//     });
//   }

//   ngOnInit() {
//     AOS.init({ duration: 1000, once: true }); // Initialize AOS
//   }
// submit() {
//   if (this.form.invalid) {
//     this.form.markAllAsTouched();
//     return;
//   }

//   const userId = localStorage.getItem('userId'); // or token that contains userId info

//   if (!userId) {
//     alert('User not logged in. Please login to submit an issue.');
//     return;
//   }

//   const payload = {
//     userId,
//     name: this.form.value.name.trim(),
//     email: this.form.value.email.trim(),
//     issueType: this.form.value.issueType.trim(),
//     description: this.form.value.description.trim(),
//     location: this.form.value.location.trim(),
//     date: this.form.value.date
//   };

//   this.submitting = true;
//   this.api.createIssue(payload).subscribe({
//     next: _ => {
//       this.submitting = false;
//       alert('Issue submitted successfully!');
//       this.router.navigate(['/user/dashboard']);
//     },
//     error: err => {
//       this.submitting = false;
//       console.error('Issue submit error', err);
//       alert('Failed to submit issue. See console for details.');
//     }
//   });
// }


//   cancel() {
//     this.router.navigate(['/user/dashboard']);
//   }
// }
// src/app/user/issue-form/issue-form.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ApiService } from '../service/api';
import * as AOS from 'aos';
import { Issue } from '../models/issue';

@Component({
  selector: 'app-issue-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './issue-form.html',
  styleUrls: ['./issue-form.css']
})
export class IssueFormComponent implements OnInit {
  form!: FormGroup;
  submitting = false;

  // Example: Get current userId (replace with your auth logic)
  currentUserId = '123'; 


  constructor(private fb: FormBuilder, private api: ApiService,private router:Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      issueType: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

submit(): void {
  // Check if user is logged in
  const currentUser = localStorage.getItem('user'); // assuming you store user info after login

  if (!currentUser) {
    alert('⚠️ You need to log in before submitting an issue.');
    return; // stop submission
  }

  const parsedUser = JSON.parse(currentUser);
  this.currentUserId = parsedUser._id || parsedUser.id; // adjust based on your backend user model

  // Validate the form
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.submitting = true;

  const issueData: Partial<Issue> = {
    ...this.form.value,
    userId: this.currentUserId
  };

  this.api.createIssue(issueData).subscribe({
    next: (res) => {
      console.log('✅ Issue submitted successfully', res);
      alert('Issue submitted successfully!');
      this.form.reset();
      this.submitting = false;
      this.router.navigate(['/user/dashboard']);
      
    },
    error: (err) => {
      console.error('❌ Issue submission failed:', err);
      alert('Failed to submit issue. Please try again.');
      this.submitting = false;
    }
  });
}
back(){
  this.router.navigate(['/user/dashboard']);
}

  cancel(): void {
    this.form.reset();
  }
}