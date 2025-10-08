import { Component } from '@angular/core';
import { NavAdmin } from '../nav-admin/nav-admin';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-add-issue',
  imports: [NavAdmin, MatTableModule, CommonModule, RouterLink],
  templateUrl: './add-issue.html',
  styleUrl: './add-issue.css'
})
export class AddIssue {

  displayedColumns: string[] = [
    'name',
    "email",
    "date",
    "issueType",
    "description", 
    "location",
    "status"
  ]
dataSource = new MatTableDataSource([
    { name: "test", email: 'test@gmail.com', issueType: "electricity", description: 'street light is not working', location:"Chennai", date:"20-03-2025", status:"Pending"},
  { name: "test", email: 'test@gmail.com', issueType: "electricity", description: 'street light is not working', location:"Chennai" , date:"20-03-2025" },
  { name: "test", email: 'test@gmail.com', issueType: "electricity", description: 'street light is not working', location:"Chennai" , date:"20-03-2025" },
  { name: "test", email: 'test@gmail.com', issueType: "electricity", description: 'street light is not working', location:"Chennai" , date:"20-03-2025"},
  { name: "test", email: 'test@gmail.com', issueType: "electricity", description: 'street light is not working', location:"Chennai", date:"20-03-2025" },
 
  ]);
}
