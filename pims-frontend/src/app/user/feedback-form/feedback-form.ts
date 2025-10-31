

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../service/api';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './feedback-form.html',
  styleUrls: ['./feedback-form.css']
})
export class FeedbackFormComponent {
  form: FormGroup;
  submitting = false;
  selectedIssueId?: number;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.form = this.fb.group({
      message: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // ✅ Check login status
    const user = localStorage.getItem('user') || localStorage.getItem('role');
    if (!user) {
      alert('You must be logged in to submit feedback.');
      // this.router.navigate(['/login']);
      return;
    }

    this.submitting = true;

    const payload = {
      message: this.form.value.message,
      issueId: this.selectedIssueId || undefined
    };

    this.api.submitFeedback(payload).subscribe({
      next: () => {
        this.submitting = false;
        alert('Thanks for your feedback!');
        this.router.navigate(['/user/dashboard']);
      },
      error: err => {
        this.submitting = false;
        console.error('Feedback submit error', err);
        alert('Failed to send feedback. Please try again.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/user/dashboard']);
  }
}
