// src/app/user/feedback-form/feedback-form.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../service/api'; // keep your path if correct
import { Feedback } from '../models/feedback'; // optional - for typing

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

  // optional: hold a selected issue id (undefined when not provided)
  selectedIssueId?: number;

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    // Initialize the form inside the constructor so fb is available
    this.form = this.fb.group({
      message: ['', Validators.required]
      // If you add a control for issue id: issueId: [null]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;

    const messageValue: string = this.form.value.message ?? '';

    // Build payload according to backend model
    const payload = {
      message: messageValue,
      issueId: this.selectedIssueId || undefined // Only include if exists
    };

    this.api.submitFeedback(payload).subscribe({
      next: _ => {
        this.submitting = false;
        alert('Thanks for your feedback');
        this.router.navigate(['/user/dashboard']);
      },
      error: err => {
        this.submitting = false;
        console.error('Feedback submit error', err);
        alert('Failed to send feedback. See console for details.');
      }
    });
  }

  cancel() {
    this.router.navigate(['/user/dashboard']);
  }
}
