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
];
