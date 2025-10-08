// // import { Component } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { ReactiveFormsModule, FormBuilder, Validators ,FormGroup} from '@angular/forms';
// // import { RouterModule, Router } from '@angular/router';
// // import { MatFormFieldModule } from '@angular/material/form-field';
// // import { MatInputModule } from '@angular/material/input';
// // import { MatSelectModule } from '@angular/material/select';
// // import { MatButtonModule } from '@angular/material/button';
// // import { ApiService } from '../service/api';
// // @Component({
// //   selector: 'app-issue-form',
// //   standalone:true,
// //   imports: [CommonModule, ReactiveFormsModule, RouterModule,
// //     MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
// //   templateUrl: './issue-form.html',
// //   styleUrl: './issue-form.css'
// // })
// // export class IssueFormComponent {
// //   form: FormGroup;
// //   submitting = false;

// //   constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
// //     // Initialize the form here so `fb` is available.
// //     this.form = this.fb.group({
// //       title: ['', Validators.required],
// //       description: [''],
// //       category: ['road', Validators.required]
// //     });
// //   }

// //   submit() {
// //     if (this.form.invalid) {
// //       this.form.markAllAsTouched();
// //       return;
// //     }

// //     this.submitting = true;

// //     // Coerce values to non-nullable types for the API payload
// //     const payload = {
// //       user_id: 1, // TODO: replace with actual authenticated user id
// //       title: this.form.value.title ?? '',
// //       description: this.form.value.description ?? '',
// //       category: this.form.value.category ?? 'road'
// //     };

// //     this.api.createIssue(payload).subscribe({
// //       next: _ => {
// //         this.submitting = false;
// //         alert('Issue submitted successfully');
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

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
// import { RouterModule, Router } from '@angular/router';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { ApiService } from '../service/api';

// @Component({
//   selector: 'app-issue-form',
//   standalone: true,
//   imports: [
//     CommonModule,FormsModule,
//     ReactiveFormsModule,
//     RouterModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatButtonModule
//   ],
//   templateUrl: './issue-form.html',
//   styleUrls: ['./issue-form.css'] // Corrected
// })
// export class IssueFormComponent {
//   form: FormGroup;
//   submitting = false;

//   constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
//     this.form = this.fb.group({
//       title: ['', Validators.required],
//       description: ['', Validators.required], // Make required for validation
//       category: ['road', Validators.required]
//     });
//   }

//   submit() {
//     // Mark all fields as touched to show validation errors
//     if (this.form.invalid) {
//       this.form.markAllAsTouched();
//       return;
//     }

//     this.submitting = true;

//     const payload = {
//       user_id: 1, // TODO: Replace with actual user ID
//       title: this.form.value.title ?? '',
//       description: this.form.value.description ?? '',
//       category: this.form.value.category ?? 'road'
//     };

//     this.api.createIssue(payload).subscribe({
//       next: _ => {
//         this.submitting = false;
//         alert('Issue submitted successfully!');
//         this.router.navigate(['/user/dashboard']);
//       },
//       error: err => {
//         this.submitting = false;
//         console.error('Issue submit error', err);
//         alert('Failed to submit issue. See console for details.');
//       }
//     });
//   }

//   cancel() {
//     this.router.navigate(['/user/dashboard']);
//   }
// }



import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../service/api';
import * as AOS from 'aos'; // Import AOS
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


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
    MatButtonModule,MatDatepickerModule,MatNativeDateModule
  ],
  templateUrl: './issue-form.html',
  styleUrls: ['./issue-form.css']
})
export class IssueFormComponent implements OnInit {
  form: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      issueType: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required] // New field

    });
  }

  ngOnInit() {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const payload = {
      name: this.form.value.name.trim(),
      email: this.form.value.email.trim(),
      issueType: this.form.value.issueType.trim(),
      description: this.form.value.description.trim(),
      location: this.form.value.location.trim(),
      date: this.form.value.date

    };

    this.api.createIssue(payload).subscribe({
      next: _ => {
        this.submitting = false;
        alert('Issue submitted successfully!');
        this.router.navigate(['/user/dashboard']);
      },
      error: err => {
        this.submitting = false;
        console.error('Issue submit error', err);
        alert('Failed to submit issue. See console for details.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/user/dashboard']);
  }
}
