import { Component } from '@angular/core';
import { NavAdmin } from '../nav-admin/nav-admin';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../service/admin-service';

@Component({
  selector: 'app-dashboard',
  imports: [NavAdmin, CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  imgpath = "assets/images/bg-admin.jpg";
items = [
  { 
    title: 'Panchayat Issue Reporting Module', 
    details: 'Allows residents to easily report local issues such as water, sanitation, and road maintenance through a user-friendly interface.', 
    show: false 
  },
  { 
    title: 'Admin Dashboard & Monitoring', 
    details: 'Provides Panchayat administrators with tools to track, update, and resolve issues efficiently while maintaining transparency.', 
    show: false 
  },
  { 
    title: 'User Management System', 
    details: 'Supports secure user registration, login for both citizens and admin, and role-based access to ensure data integrity.', 
    show: false 
  },
  { 
    title: 'Automated Status Tracking', 
    details: 'Keeps users informed with real-time updates on issue progress — from submission to resolution.', 
    show: false 
  },
  { 
    title: 'Technology Stack', 
    details: 'Developed using Angular, Node.js, Express, and MongoDB for a responsive and scalable web application.', 
    show: false 
  }
];

constructor(private service: AdminService){}

totalComplaints:any;
completedComplaints:any;
inProgressComplaints:any;
ngOnInit(){
  this.service.fetchData().subscribe((res:any) =>{
   this.totalComplaints = res.totalComplaints;
   this.completedComplaints = res.completedComplaints;
   this.inProgressComplaints = res.inProgressComplaints;
  });
}
  
}
