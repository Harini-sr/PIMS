









import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../service/api';
import { Issue } from '../models/issue';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class UserDashboardComponent implements OnInit {
  issues: any;
  activeSection: 'home' | 'issues' | 'about' | 'services' = 'home';
  role: string | null = null;
  heroUrl = '/assets/hero.jpg';
  username: string | null = null;
userId: any;
user:any;
  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private onScroll = () => {
    const sections = ['home', 'issues', 'about', 'services'] as const;
    for (const sec of sections) {
      const el = document.getElementById(sec);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        this.activeSection = sec;
      }
    }
  };

ngOnInit(): void {
  // Get user object from localStorage
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    this.username = user.username;
  this.userId= user._id
  this.user = user.userId
    this.role = user.role;

    // Get issueId dynamically from route params
  if (this.userId) {
      this.api.getUserIssues(this.userId).subscribe({
        next: (data) => this.issues = data,
        error: (err) => console.error('Error fetching issues:', err)
      });
    }
    }
  
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const el = document.getElementById(fragment);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        }
      }
    });

    window.addEventListener('scroll', this.onScroll);
  }
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    this.role = null;
    this.username = null;
    this.userId = null;

    this.router.navigate(['/user/dashboard'], { fragment: 'home' });
  }
}
