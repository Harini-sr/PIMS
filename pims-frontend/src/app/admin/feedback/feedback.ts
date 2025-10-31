import { Component } from '@angular/core';
import { NavAdmin } from '../nav-admin/nav-admin';
import { AdminService } from '../service/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  imports: [NavAdmin, CommonModule],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css'
})
export class Feedback {

  constructor(private service:AdminService){}
  feedbacks:any;
ngOnInit(){
  this.service.feedback().subscribe((res:any)=>{
   this.feedbacks = res.data;
  })
}
}
