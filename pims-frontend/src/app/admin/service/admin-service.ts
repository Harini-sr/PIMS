import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../model/admin-model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private readonly create = 'http://localhost:3000/api/issues/';
  private readonly getAll = 'http://localhost:3000/api/issues/getIssue';
  private readonly updateIssue = "http://localhost:3000/api/issues";
  private readonly getFeedback = 'http://localhost:8000/api/feedback';

  createData(issue: Issue): Observable<any> {
    return this.http.post(`${this.create}`, issue);
  }
  fetchData() {
    return this.http.get(`${this.getAll}`);
  }
  updateIssueStatus(id: string, status: string) {
    return this.http.put(`${this.updateIssue}/${id}`, { status });
  }

  /* fetch all feedback */

  feedback() {
    return this.http.get(`${this.getFeedback}`);
  }
}
