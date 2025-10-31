import { Component } from '@angular/core';
import { NavAdmin } from '../nav-admin/nav-admin';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { Issue } from '../model/admin-model';
import { AdminService } from '../service/admin-service';
@Component({
  selector: 'app-issue-form',
  imports: [NavAdmin, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './issue-form.html',
  styleUrl: './issue-form.css'
})
export class IssueForm {

constructor(private adminService:AdminService){}

   issueForm = new FormGroup({
        id: new FormControl({ value: uuidv4(), disabled: true }), 
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
   get uid() {
    return this.issueForm.get('id')?.value;
  }

  get fname() {
    return this.issueForm.get('name');
  }

  get mail() {
    return this.issueForm.get('email');
  }

  get issuesType() {
    return this.issueForm.get('issueType');
  }

  get descriptions() {
    return this.issueForm.get('description');
  }

  get dates() {
    return this.issueForm.get('date');
  }

  get locationField() {
    return this.issueForm.get('location');
  }

  submit() {
    if (this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }

    const save: Issue = {
 
      name: this.fname?.value || '',
      email: this.mail?.value || '',
      issueType: this.issuesType?.value || '',
      description: this.descriptions?.value || '',
      date: this.dates?.value || '',
      location: this.locationField?.value || '',
    };

    console.log('Submitting Issue:', save);
    this.issueForm.reset();


    this.adminService.createData(save).subscribe((res:any) =>{
      console.log(res);
      
    });
  }

  clear(){
       this.issueForm.reset();
  }
}
