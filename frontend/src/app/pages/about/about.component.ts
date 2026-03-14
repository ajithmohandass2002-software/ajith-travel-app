import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="about-container">
      <div class="about-hero">
        <h1>About TravelGo</h1>
        <p>Connecting you to the world's most breathtaking experiences.</p>
      </div>
      
      <div class="about-content">
        <section>
          <h2>Our Mission</h2>
          <p>Founded in 2024, TravelGo was born out of a simple passion: making world-class travel accessible, seamless, and unforgettable. We believe that travel is more than just visiting a place—it's about the stories you tell and the memories you bring home.</p>
        </section>

        <section class="stats-grid">
          <div class="stat-item">
            <mat-icon>public</mat-icon>
            <h3>50+</h3>
            <p>Destinations</p>
          </div>
          <div class="stat-item">
            <mat-icon>people</mat-icon>
            <h3>10k+</h3>
            <p>Happy Travelers</p>
          </div>
          <div class="stat-item">
            <mat-icon>stars</mat-icon>
            <h3>4.9/5</h3>
            <p>Average Rating</p>
          </div>
        </section>

        <section>
          <h2>Who We Are</h2>
          <p>We are a team of explorers, techies, and dreamers. Our platform combines cutting-edge technology with deep local expertise to ensure every trip you book is perfect from start to finish.</p>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .about-container { padding-bottom: 50px; }
    .about-hero { 
      background: linear-gradient(45deg, #3f51b5, #2196f3); 
      color: white; 
      padding: 80px 20px; 
      text-align: center;
      margin-bottom: 40px;
    }
    .about-hero h1 { font-size: 3rem; margin-bottom: 10px; }
    .about-content { max-width: 900px; margin: 0 auto; padding: 0 20px; line-height: 1.6; }
    section { margin-bottom: 40px; }
    h2 { font-size: 2rem; color: var(--header-background); border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px; }
    
    .stats-grid { 
      display: grid; 
      grid-template-columns: repeat(3, 1fr); 
      gap: 20px; 
      text-align: center;
      margin: 60px 0;
    }
    .stat-item mat-icon { font-size: 40px; height: 40px; width: 40px; color: #3f51b5; margin-bottom: 10px; }
    .stat-item h3 { font-size: 2.5rem; margin: 0; font-weight: bold; }
    .stat-item p { color: #666; font-size: 1.1rem; }
  `]
})
export class AboutComponent {
}
