// // // import { Injectable } from '@angular/core';
// // // import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // // import { Observable, throwError } from 'rxjs';
// // // import { catchError } from 'rxjs/operators';
// // // import { Issue } from '../models/issue';
// // // import { Feedback } from '../models/feedback';

// // // @Injectable({
// // //   providedIn: 'root'
// // // })
// // // export class ApiService {
// // //   private baseUrl = 'http://localhost:8000/api';

// // //   constructor(private http: HttpClient) {}
// // // getUserIssues(userId: number): Observable<Issue[]> {
// // //   return this.http.get<Issue[]>(`${this.baseUrl}/user/issues?userId=${userId}`, {
// // //     withCredentials: true
// // //   });
// // // }

// // // getIssueById(issueId: string): Observable<Issue> {
// // //   return this.http.get<Issue>(`${this.baseUrl}/user/issues/${issueId}`, {
// // //     withCredentials: true
// // //   }).pipe(
// // //     catchError(err => {
// // //       console.error('API Error (getIssueById):', err);
// // //       return throwError(() => new Error('Failed to fetch issue.'));
// // //     })
// // //   );
// // // }
// // // getChatResponse(message: string) {
// // //   return this.http.post<{ answer: string }>(
// // //     `${this.baseUrl}/chat`,
// // //     { message },
// // //     { withCredentials: true }
// // //   ).pipe(
// // //     catchError((error: HttpErrorResponse) => {
// // //       console.error('Chat API Error:', error);
// // //       return throwError(() => new Error('Failed to get chat response. Please try again.'));
// // //     })
// // //   );
// // // }




// // //   createIssue(issue: Partial<Issue>): Observable<Issue> {
// // //   console.log('Sending issue to:', `${this.baseUrl}/user/issues`);
// // //   console.log('Issue data:', issue);
  
// // //   return this.http.post<Issue>(`${this.baseUrl}/user/issues`, issue, {
// // //     withCredentials: true,
// // //     headers: {
// // //       'Content-Type': 'application/json',
// // //       'Accept': 'application/json'
// // //     }
// // //   }).pipe(
// // //     catchError((error: HttpErrorResponse) => {
// // //       console.error('API Error (createIssue):', error);
// // //       if (error.error instanceof ErrorEvent) {
// // //         console.error('Client-side error:', error.error.message);
// // //       } else {
// // //         console.error(`Backend returned code ${error.status}, body was:`, error.error);
// // //         if (error.status === 0) {
// // //           console.error('Possible CORS issue or server not reachable');
// // //         }
// // //       }
// // //       return throwError(() => new Error('Failed to submit issue. Please check your connection and try again.'));
// // //     })
// // //   );
// // // }


// // //   submitFeedback(feedback: Partial<Feedback>): Observable<Feedback> {
// // //     return this.http.post<Feedback>(`${this.baseUrl}/feedback`, feedback, {
// // //       withCredentials: true, // Include credentials (cookies, basic http auth)
// // //       headers: {
// // //         'Content-Type': 'application/json'
// // //       }
// // //     }).pipe(
// // //       catchError((error: any) => {
// // //         console.error('API Error:', error);
// // //         if (error.error instanceof ErrorEvent) {
// // //           // Client-side error
// // //           console.error('Client-side error:', error.error.message);
// // //         } else {
// // //           // Backend error
// // //           console.error(`Backend returned code ${error.status}, body was:`, error.error);
// // //         }
// // //         return throwError('Something went wrong; please try again later.');
// // //       })
// // //     );
// // //   }
// // // }



// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { Issue } from '../models/issue';
// import { Feedback } from '../models/feedback';


// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {
// private baseUrl = 'https://pims-application.onrender.com/api';
//   private chatbotUrl = 'http://localhost:5000'; // or your deployed chatbot URL

//   constructor(private http: HttpClient) {}

//   // ======== Existing Methods ========
//   // getUserIssues(userId: string): Observable<any[]> {
//   //   return this.http.get<any[]>(`${this.baseUrl}/user/issues?userId=${userId}`);
//   // }

//   // === Chatbot ===
//   // getChatResponse(message: string, userId?: string): Observable<{ answer: string }> {
//   //   const body: any = { question: message };
//   //   if (userId) body.userId = userId;
//   //   return this.http.post<{ answer: string }>(`${this.chatbotUrl}/ask`, body);
//   // }

//   getIssueById(issueId: string): Observable<Issue> {
//     return this.http.get<Issue>(`${this.baseUrl}/user/issues/${issueId}`, {
//       withCredentials: true
//     }).pipe(
//       catchError(err => {
//         console.error('API Error (getIssueById):', err);
//         return throwError(() => new Error('Failed to fetch issue.'));
//       })
//     );
//   }

//   createIssue(issue: Partial<Issue>): Observable<Issue> {
//     return this.http.post<Issue>(`${this.baseUrl}/user/issues`, issue, {
//       withCredentials: true,
//       headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
//     }).pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.error('API Error (createIssue):', error);
//         return throwError(() => new Error('Failed to submit issue.'));
//       })
//     );
//   }

//   submitFeedback(feedback: Partial<Feedback>): Observable<Feedback> {
//     return this.http.post<Feedback>(`${this.baseUrl}/feedback`, feedback, {
//       withCredentials: true,
//       headers: { 'Content-Type': 'application/json' }
//     }).pipe(
//       catchError((error: any) => {
//         console.error('API Error (submitFeedback):', error);
//         return throwError(() => new Error('Something went wrong; please try again later.'));
//       })
//     );
//   }
// // === Image Generation ===
// // In ApiService
// generateImage(prompt: string, size: string = '512x512') {
//   return this.http.post<{ imageBase64: string }>(
//     `${this.chatbotUrl}/generate-image`,
//     { prompt, size }
//   );
// }
// getChatResponse(message: string, userId?: string): Observable<{ answer: string }> {
//   const body: any = { question: message };
//   if (userId) body.userId = userId;

//   console.log('Sending to chatbot:', body); // 👀 Check this
//   return this.http.post<{ answer: string }>(`${this.chatbotUrl}/ask`, body);
// }


// getUserIssues(userId: string): Observable<any[]> {
//   return this.http.get<any[]>(`${this.baseUrl}/user/issues?userId=${userId}`);
// }




//   // Optional: fetch user info from chatbot backend
//   getUser(userId: number) {
//     return this.http.get(`${this.chatbotUrl}/user/${userId}`, {
//       withCredentials: true
//     }).pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.error('User API Error:', error);
//         return throwError(() => new Error('Failed to fetch user info.'));
//       })
//     );
//   }
// }



// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// // import { Observable, throwError } from 'rxjs';
// // import { catchError, map } from 'rxjs/operators';
// // import { Issue } from '../models/issue';
// // import { Feedback } from '../models/feedback';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class ApiService {
// //   private baseUrl = 'https://pims-application.onrender.com/api';
// //   private chatbotUrl = 'http://localhost:5000'; // or your deployed chatbot URL

// //   constructor(private http: HttpClient) {}

// //   // ======== Existing Methods ========
// //   getIssueById(issueId: string): Observable<Issue> {
// //     return this.http.get<Issue>(`${this.baseUrl}/user/issues/${issueId}`, {
// //       withCredentials: true
// //     }).pipe(
// //       catchError(err => {
// //         console.error('API Error (getIssueById):', err);
// //         return throwError(() => new Error('Failed to fetch issue.'));
// //       })
// //     );
// //   }

// //   createIssue(issue: Partial<Issue>): Observable<Issue> {
// //     return this.http.post<Issue>(`${this.baseUrl}/user/issues`, issue, {
// //       withCredentials: true,
// //       headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
// //     }).pipe(
// //       catchError((error: HttpErrorResponse) => {
// //         console.error('API Error (createIssue):', error);
// //         return throwError(() => new Error('Failed to submit issue.'));
// //       })
// //     );
// //   }

// //   submitFeedback(feedback: Partial<Feedback>): Observable<Feedback> {
// //     return this.http.post<Feedback>(`${this.baseUrl}/feedback`, feedback, {
// //       withCredentials: true,
// //       headers: { 'Content-Type': 'application/json' }
// //     }).pipe(
// //       catchError((error: any) => {
// //         console.error('API Error (submitFeedback):', error);
// //         return throwError(() => new Error('Something went wrong; please try again later.'));
// //       })
// //     );
// //   }

// //   getUserIssues(userId: string): Observable<any[]> {
// //     return this.http.get<any[]>(`${this.baseUrl}/user/issues?userId=${userId}`);
// //   }

// //   // Optional: fetch user info from chatbot backend
// //   getUser(userId: number) {
// //     return this.http.get(`${this.chatbotUrl}/user/${userId}`, {
// //       withCredentials: true
// //     }).pipe(
// //       catchError((error: HttpErrorResponse) => {
// //         console.error('User API Error:', error);
// //         return throwError(() => new Error('Failed to fetch user info.'));
// //       })
// //     );
// //   }

// //   // ======== Hugging Face Chatbot Integration ========
// //   getChatResponse(
// //     message: string,
// //     userId?: string,
// //     username?: string,
// //     role?: string
// //   ): Observable<{ answer: string }> {
// //     const body: any = { question: message };
// //     if (userId) body.userId = userId;
// //     if (username) body.username = username;
// //     if (role) body.role = role;

// //     console.log('Sending to chatbot:', body); // Debugging
// //     return this.http.post<{ answer: string }>(`${this.chatbotUrl}/ask`, body).pipe(
// //       catchError(err => {
// //         console.error('API Error (getChatResponse):', err);
// //         return throwError(() => new Error('Failed to get chat response.'));
// //       })
// //     );
// //   }

// //   // ======== Hugging Face Image Generation ========
// //   generateImage(prompt: string, size: string = '512x512'): Observable<string> {
// //     return this.http
// //       .post<{ imageUrl: string }>(`${this.chatbotUrl}/generate-image`, { prompt, size })
// //       .pipe(
// //         map(res => res.imageUrl),
// //         catchError(err => {
// //           console.error('API Error (generateImage):', err);
// //           return throwError(() => new Error('Failed to generate image.'));
// //         })
// //       );
// //   }
// // }


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
  private baseUrl = 'https://pims-application.onrender.com/api';
  private chatbotUrl = 'http://localhost:5000'; // or your deployed chatbot URL

  constructor(private http: HttpClient) {}

  // ============================
  // 🧾 ISSUE MANAGEMENT
  // ============================

  getUserIssues(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/issues?userId=${userId}`);
  }

  getIssueById(issueId: string): Observable<Issue> {
    return this.http.get<Issue>(`${this.baseUrl}/user/issues/${issueId}`, {
      withCredentials: true
    }).pipe(
      catchError(err => {
        console.error('API Error (getIssueById):', err);
        return throwError(() => new Error('Failed to fetch issue.'));
      })
    );
  }

  createIssue(issue: Partial<Issue>): Observable<Issue> {
    return this.http.post<Issue>(`${this.baseUrl}/user/issues`, issue, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API Error (createIssue):', error);
        return throwError(() => new Error('Failed to submit issue.'));
      })
    );
  }

  // ============================
  // 💬 FEEDBACK MANAGEMENT
  // ============================

  submitFeedback(feedback: Partial<Feedback>): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.baseUrl}/feedback`, feedback, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error: any) => {
        console.error('API Error (submitFeedback):', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
      })
    );
  }

  // ✅ NEW: Fetch feedbacks for a specific user
getUserFeedbacks(userId: string): Observable<Feedback[]> {
    // Try this route first
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedback?userId=${userId}`, {
      withCredentials: true
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('API Error (getUserFeedbacks):', error);
        return throwError(() => new Error('Failed to fetch user feedback.'));
      })
    );
  }

  // ============================
  // 🤖 CHATBOT INTEGRATION
  // ============================

  getChatResponse(message: string, userId?: string): Observable<{ answer: string }> {
    const body: any = { question: message };
    if (userId) body.userId = userId;

    console.log('Sending to chatbot:', body);
    return this.http.post<{ answer: string }>(`${this.chatbotUrl}/ask`, body);
  }

  // ============================
  // 🖼️ IMAGE GENERATION
  // ============================

  generateImage(prompt: string, size: string = '512x512') {
    return this.http.post<{ imageBase64: string }>(
      `${this.chatbotUrl}/generate-image`,
      { prompt, size }
    );
  }
}
