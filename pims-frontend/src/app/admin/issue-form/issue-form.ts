import { Component } from '@angular/core';
import { NavAdmin } from '../nav-admin/nav-admin';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-issue-form',
  imports: [NavAdmin, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './issue-form.html',
  styleUrl: './issue-form.css'
})
export class IssueForm {

   issueForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    issueType: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });
}
