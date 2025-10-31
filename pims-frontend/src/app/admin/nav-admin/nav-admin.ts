import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  imports: [RouterLink, RouterOutlet ],
  templateUrl: './nav-admin.html',
  styleUrl: './nav-admin.css'
})
export class NavAdmin {

  constructor(private router: Router){}
logout() {

  localStorage.removeItem('role');
  localStorage.removeItem('user');

  this.router.navigate(['/login']);
}
name:any;
role:any;
id:any;

ngOnInit(){
  const user = localStorage.getItem('user'); 
  if (user) {
    const userObj = JSON.parse(user);
    this.name = userObj.username;
    this.id = userObj.userId;
    this.role = userObj.role;
  }
  this.role = localStorage.getItem('role')
}

}
