import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
export const routes: Routes = [
    {
      path: 'nav-admin',
      loadComponent: () => import('./admin/nav-admin/nav-admin').then(m => m.NavAdmin),
          canActivate: [authGuard],
    data: { role: 'admin' },

<<<<<<< HEAD
    },
    {
      path: '', 
      redirectTo:'login',  
      pathMatch: 'full'
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
        path: 'issue-form',
      loadComponent: () => import('./admin/issue-form/issue-form').then(m => m.IssueForm),
           canActivate: [authGuard],
    data: { role: 'admin' },
  
    },
       {
        path: 'login',
      loadComponent: () => import('./admin/login/login').then(m => m.Login),
      
  
    }
=======
export const routes: Routes = [
    { path: '', redirectTo: 'user/dashboard', pathMatch: 'full' },
  { path: 'user/dashboard', loadComponent: () => import('./user/dashboard/dashboard').then(m => m.UserDashboardComponent) },
  { path: 'user/report-issue', loadComponent: () => import('./user/issue-form/issue-form').then(m => m.IssueFormComponent) },
  { path: 'user/feedback', loadComponent: () => import('./user/feedback-form/feedback-form').then(m => m.FeedbackFormComponent) },
  { path: '**', redirectTo: 'user/dashboard' }
>>>>>>> 5d3874768f28706555dee3b10b4fe0c8dce50fa5
];
