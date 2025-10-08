import { Component } from '@angular/core';
import { NavAdmin } from '../nav-admin/nav-admin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NavAdmin, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  imgpath = "assets/images/bg-admin.jpg";

items = [
    { 
      title: 'Google UX Design Professional Certificate', 
      details: 'Completed in 2023 with hands-on projects.', 
      show: false 
    },
    { 
      title: 'AWS Certified Solutions Architect', 
      details: 'Validated cloud architecture skills.', 
      show: false 
    },
    { 
      title: 'Certified Agile Project Manager', 
      details: 'Focused on agile project management techniques.', 
      show: false 
    }
  ];
  
}
