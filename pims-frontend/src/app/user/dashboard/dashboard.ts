

// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { MatCardModule } from '@angular/material/card';
// import { ApiService } from '../service/api';
// import { Issue } from '../models/issue';

// @Component({
//   selector: 'app-user-dashboard',
//   standalone: true,
//   imports: [CommonModule, RouterModule, MatCardModule],
//   templateUrl: `dashboard.html`,
//   styleUrls: [`dashboard.css`]
// })
// export class UserDashboardComponent implements OnInit, OnDestroy {
//   issues: Issue[] = [];
//   statusBlocks = [
//     { title: 'Open', count: 0 },
//     { title: 'In Progress', count: 0 },
//     { title: 'Resolved', count: 0 }
//   ];
//   activeSection: string = 'home';

//   constructor(private api: ApiService) {}

//   ngOnInit(): void {
//     const userId = 1;
//     this.api.getUserIssues(userId).subscribe({
//       next: data => {
//         this.issues = data;
//         this.calculateStatusBlocks();
//       },
//       error: err => console.error(err)
//     });

//     // Add scroll event listener for active section tracking
//     window.addEventListener('scroll', this.onScroll.bind(this));
//   }

//   ngOnDestroy(): void {
//     // Clean up scroll event listener
//     window.removeEventListener('scroll', this.onScroll.bind(this));
//   }

//   heroUrl = '/assets/hero.jpg';
//   fallback = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="%23777">PIMS — hero image</text></svg>';

//   onImageError(event: Event) {
//     const img = event.target as HTMLImageElement;
//     if (img && img.src !== this.fallback) img.src = this.fallback;
//   }

//   calculateStatusBlocks() {
//     const map: Record<string, number> = { Open: 0, 'In Progress': 0, Resolved: 0 };
//     for (const i of this.issues) map[i.status] = (map[i.status] || 0) + 1;
//     this.statusBlocks = [
//       { title: 'Open', count: map['Open'] },
//       { title: 'In Progress', count: map['In Progress'] },
//       { title: 'Resolved', count: map['Resolved'] }
//     ];
//   }

//   scrollToList() {
//     const el = document.getElementById('issues-section');
//     if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   }

//   scrollToSection(sectionId: string) {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       this.activeSection = sectionId;
//     }
//   }
// onScroll(): void {
//   const sections = ['home', 'issues', 'about', 'services'];
//   const scrollPosition = window.scrollY + 100;

//   for (const sectionId of sections) {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       const offsetTop = element.offsetTop;
//       const offsetBottom = offsetTop + element.offsetHeight;

//       if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
//         if (this.activeSection !== sectionId) {
//           this.activeSection = sectionId;
//         }
//         break;
//       }
//     }
//   }

//   // Animate service bubbles when they enter view
//   const bubbles = document.querySelectorAll('.service-bubble');
//   bubbles.forEach(bubble => {
//     const rect = bubble.getBoundingClientRect();
//     if (rect.top < window.innerHeight - 100) {
//       bubble.classList.add('animate');
//     }
//   });
// }

//   statusClass(status?: string) {
//     if (!status) return '';
//     const s = status.toLowerCase();
//     if (s.includes('open')) return 'status-open';
//     if (s.includes('progress')) return 'status-inprogress';
//     if (s.includes('resolved')) return 'status-resolved';
//     return '';
//   }
// }

import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../service/api';
import { Issue } from '../models/issue';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: `dashboard.html`,
  styleUrls: [`dashboard.css`]
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  issues: Issue[] = [];
  statusBlocks = [
    { title: 'Open', count: 0 },
    { title: 'In Progress', count: 0 },
    { title: 'Resolved', count: 0 }
  ];
  activeSection: string = 'home';

  heroUrl = '/assets/hero.jpg';
  fallback = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="24" fill="%23777">PIMS — hero image</text></svg>';

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const userId = 1;
    this.api.getUserIssues(userId).subscribe({
      next: data => {
        this.issues = data;
        this.calculateStatusBlocks();
      },
      error: err => console.error(err)
    });

    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img && img.src !== this.fallback) img.src = this.fallback;
  }

  calculateStatusBlocks() {
    const map: Record<string, number> = { Open: 0, 'In Progress': 0, Resolved: 0 };
    for (const i of this.issues) {
      map[i.status] = (map[i.status] || 0) + 1;
    }
    this.statusBlocks = [
      { title: 'Open', count: map['Open'] },
      { title: 'In Progress', count: map['In Progress'] },
      { title: 'Resolved', count: map['Resolved'] }
    ];
  }

  scrollToList() {
    const el = document.getElementById('issues-section');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection = sectionId;
    }
  }
onScroll(): void {
  const sections = ['home', 'issues', 'about', 'services'];

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
        if (this.activeSection !== sectionId) {
          this.activeSection = sectionId;
          this.cdr.detectChanges();
        }
        break;
      }
    }
  }

  // Animate service bubbles
  const bubbles = document.querySelectorAll('.service-bubble');
  bubbles.forEach(bubble => {
    const rect = bubble.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      bubble.classList.add('animate');
    }
  });
}

  statusClass(status?: string) {
    if (!status) return '';
    const s = status.toLowerCase();
    if (s.includes('open')) return 'status-open';
    if (s.includes('progress')) return 'status-inprogress';
    if (s.includes('resolved')) return 'status-resolved';
    return '';
  }
}