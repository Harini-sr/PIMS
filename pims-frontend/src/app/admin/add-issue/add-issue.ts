import { Component, ViewChild, OnInit } from '@angular/core';
import { NavAdmin } from '../nav-admin/nav-admin';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../service/admin-service';
import { Issue } from '../model/admin-model';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-issue',
  standalone: true,
  imports: [NavAdmin, MatTableModule, CommonModule, RouterLink, MatCardModule, FormsModule],
  templateUrl: './add-issue.html',
  styleUrls: ['./add-issue.css'],
})
export class AddIssue implements OnInit {
  dataSource = new MatTableDataSource<Issue>([]);
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'date',
    'issueType',
    'description',
    'location',
    'status',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Pagination variables
  pageIndex = 0;
  pageSize = 5;
  totalPages = 0;
  currentPage = 1;
  totalEntries = 0;

  constructor(private service: AdminService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadIssues(this.pageIndex + 1, this.pageSize);
  }

  loadIssues(page: number, limit: number): void {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search: this.searchTerm || '',
      date: this.selectedDate || '',
    });

    this.http.get<any>(`http://localhost:3000/api/issues/getIssue?${params}`).subscribe({
      next: (res) => {
        this.dataSource.data = res.issues;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
        this.totalEntries = res.totalComplaints || res.issues.length;
      },
      error: (err) => {
        console.error('Error loading issues:', err);
      },
    });
  }

  changePageIndex(newPageIndex: number): void {
    if (newPageIndex < 0 || newPageIndex >= this.totalPages) return;
    this.pageIndex = newPageIndex;
    this.loadIssues(newPageIndex + 1, this.pageSize);
  }

  cycleStatus(element: Issue) {
    element.status = element.status === 'open'  ? 'in-progress' : element.status === 'in-progress'  ? 'closed'  : 'open';

    this.service.updateIssueStatus(element._id, element.status).subscribe({
      next: () => console.log('Status updated successfully'),
      error: (err) => console.error('Failed to update status', err),
    });
  }

   // Filter variables
  searchTerm: string = '';
  selectedDate: string = '';
 //  Called whenever search or date changes
  applyFilters(): void {
    this.pageIndex = 0; // reset to first page
    this.loadIssues(1, this.pageSize);
  }

}
