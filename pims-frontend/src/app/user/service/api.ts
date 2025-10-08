import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Issue } from '../models/issue';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getUserIssues(userId: number): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.baseUrl}/user/issues?user_id=${userId}`, {
      withCredentials: true
    });
  }

  createIssue(issue: Partial<Issue>): Observable<Issue> {
    console.log('Sending issue to:', `${this.baseUrl}/user/issues`);
    console.log('Issue data:', issue);
    
    return this.http.post<Issue>(`${this.baseUrl}/user/issues`, issue, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API Error (createIssue):', error);
        if (error.error instanceof ErrorEvent) {
          console.error('Client-side error:', error.error.message);
        } else {
          console.error(`Backend returned code ${error.status}, body was:`, error.error);
          if (error.status === 0) {
            console.error('Possible CORS issue or server not reachable');
          }
        }
        return throwError(() => new Error('Failed to submit issue. Please check your connection and try again.'));
      })
    );
  }

  submitFeedback(feedback: Partial<Feedback>): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.baseUrl}/feedback`, feedback, {
      withCredentials: true, // Include credentials (cookies, basic http auth)
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError((error: any) => {
        console.error('API Error:', error);
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          console.error('Client-side error:', error.error.message);
        } else {
          // Backend error
          console.error(`Backend returned code ${error.status}, body was:`, error.error);
        }
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
}
