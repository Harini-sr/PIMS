import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
export const routes: Routes = [
      {
      path: 'nav-admin',
      loadComponent: () => import('./admin/nav-admin/nav-admin').then(m => m.NavAdmin),
          canActivate: [authGuard],
    data: { role: 'admin' },
 
    },
  
    {
      path: 'dashboard',
      loadComponent: () => import('./admin/dashboard/dashboard').then(m => m.Dashboard),
           canActivate: [authGuard],
    data: { role: 'admin' },
    },
        {
      path: 'add-issue',
      loadComponent: () => import('./admin/add-issue/add-issue').then(m => m.AddIssue),
           canActivate: [authGuard],
    data: { role: 'admin' },
    },
      {
      path: 'feedback',
      loadComponent: () => import('./admin/feedback/feedback').then(m => m.Feedback),
           canActivate: [authGuard],
    data: { role: 'admin' },
    },
    {
        path: 'issue-form',
      loadComponent: () => import('./admin/issue-form/issue-form').then(m => m.IssueForm),
           canActivate: [authGuard],
    data: { role: 'admin' },
 
    },
       {
        path: 'login',
      loadComponent: () => import('./admin/login/login').then(m => m.Login),
     
 
    },
      {
        path: 'signUp',
      loadComponent: () => import('./admin/sign-up/sign-up').then(m => m.SignUp),
     
 
    },
 



  { path: '', redirectTo: 'user/dashboard', pathMatch: 'full' },
  { path: 'user/dashboard', loadComponent: () => import('./user/dashboard/dashboard').then(m => m.UserDashboardComponent),
    data: { role: 'user' }, },


    
  { path: 'user/report-issue', loadComponent: () => import('./user/issue-form/issue-form').then(m => m.IssueFormComponent),  
    data: { role: 'user' }, },
  { path: 'user/feedback', loadComponent: () => import('./user/feedback-form/feedback-form').then(m => m.FeedbackFormComponent)},
  
];
