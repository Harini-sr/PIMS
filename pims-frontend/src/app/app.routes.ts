import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'user/dashboard', pathMatch: 'full' },
  { path: 'user/dashboard', loadComponent: () => import('./user/dashboard/dashboard').then(m => m.UserDashboardComponent) },
  { path: 'user/report-issue', loadComponent: () => import('./user/issue-form/issue-form').then(m => m.IssueFormComponent) },
  { path: 'user/feedback', loadComponent: () => import('./user/feedback-form/feedback-form').then(m => m.FeedbackFormComponent) },
  { path: '**', redirectTo: 'user/dashboard' }
];
