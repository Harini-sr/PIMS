import { Component, signal } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import AOS from 'aos';
import 'aos/dist/aos.css';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('pims-frontend');
   title = 'Panchayat Issue Management';

  ngOnInit(): void {
    AOS.init({
      duration: 800,      // animation duration
      easing: 'ease-in-out',
      once: true,         // whether animation should happen only once
      mirror: false,      // whether elements animate out while scrolling past them
    });
  }


}
