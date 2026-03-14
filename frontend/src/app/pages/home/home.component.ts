import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  template: `
    <div class="hero-section">
      <div class="hero-content">
        <h1>Discover Your Next Adventure</h1>
        <p>Explore the best destinations around the world with exclusive travel packages.</p>
        <button mat-raised-button color="accent" class="cta-button" routerLink="/destinations">Explore Now</button>
      </div>
    </div>
    
    <div class="featured-destinations">
      <h2>Popular Destinations</h2>
      <div class="destination-grid">
        <mat-card *ngFor="let dest of destinations" class="dest-card">
          <img mat-card-image [src]="dest.images && dest.images.length ? dest.images[0] : 'assets/placeholder.jpg'" alt="{{dest.name}}">
          <mat-card-content>
            <h3>{{dest.name}}, {{dest.country}}</h3>
            <p>{{dest.description | slice:0:100}}...</p>
            <div class="price-rating">
              <span class="price">\${{dest.price}}</span>
              <span class="rating"><mat-icon inline>star</mat-icon> {{dest.rating}}</span>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary">View Packages</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      height: 60vh;
      background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') no-repeat center center/cover;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-align: center;
      margin-top: -20px;
      margin-left: -20px;
      margin-right: -20px;
    }
    .hero-content h1 { font-size: 3.5rem; font-weight: bold; margin-bottom: 10px; }
    .hero-content p { font-size: 1.2rem; margin-bottom: 20px; }
    .cta-button { font-size: 1.1rem; padding: 5px 20px; }
    
    .featured-destinations { padding: 40px 20px; text-align: center; }
    .featured-destinations h2 { font-size: 2rem; margin-bottom: 30px; font-weight: 500; }
    .destination-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .dest-card { transition: transform 0.3s; cursor: pointer; text-align: left; }
    .dest-card:hover { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0,0,0,0.2); }
    .dest-card img { height: 200px; object-fit: cover; }
    .price-rating { display: flex; justify-content: space-between; align-items: center; margin-top: 15px; }
    .price { font-size: 1.2rem; font-weight: bold; color: #3f51b5; }
    .rating { display: flex; align-items: center; color: #ff9800; }
  `]
})
export class HomeComponent implements OnInit {
  destinations: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // In a real app we would use a service. Fetching directly for quick showcase.
    this.http.get('http://localhost:5000/api/destinations').subscribe((data: any) => {
      this.destinations = data.slice(0, 3); // show top 3
    }, error => {
      // Setup some dummy data if backend empty or failed
      this.destinations = [
        { name: 'Santorini', country: 'Greece', description: 'Experience the stunning sunsets', price: 1200, rating: 4.8, images: ['https://images.unsplash.com/photo-1570077188670-e3a8d69ac5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'] },
        { name: 'Kyoto', country: 'Japan', description: 'Visit historic temples and gardens', price: 1500, rating: 4.9, images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'] },
        { name: 'Banff', country: 'Canada', description: 'Explore majestic mountains', price: 900, rating: 4.7, images: ['https://images.unsplash.com/photo-1544325946-b84784405900?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'] }
      ];
    });
  }
}
