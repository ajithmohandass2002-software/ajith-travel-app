import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-destinations',
  template: `
    <div class="destinations-container">
      <h1>Explore Destinations</h1>
      
      <div *ngIf="loading" class="spinner-container">
        <mat-spinner></mat-spinner>
      </div>

      <div class="destination-grid" *ngIf="!loading">
        <mat-card *ngFor="let dest of destinations" class="dest-card">
          <img mat-card-image [src]="dest.images && dest.images.length ? dest.images[0] : 'assets/placeholder.jpg'" alt="{{dest.name}}">
          <mat-card-content>
            <h3>{{dest.name}}, {{dest.country}}</h3>
            <p>{{dest.description | slice:0:150}}...</p>
            <div class="price-rating">
              <span class="price">From \${{dest.price}}</span>
              <span class="rating"><mat-icon inline>star</mat-icon> {{dest.rating}}</span>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" [routerLink]="['/packages', dest._id]">View Packages</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .destinations-container { padding: 40px; text-align: center; }
    .destinations-container h1 { font-size: 2.5rem; margin-bottom: 20px; }
    .spinner-container { display: flex; justify-content: center; align-items: center; height: 300px; }
    .destination-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; max-width: 1400px; margin: 0 auto; }
    .dest-card { transition: transform 0.3s; cursor: pointer; text-align: left; display: flex; flex-direction: column; }
    .dest-card:hover { transform: translateY(-8px); box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
    .dest-card img { height: 220px; object-fit: cover; }
    mat-card-content { flex-grow: 1; }
    .price-rating { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; }
    .price { font-size: 1.3rem; font-weight: bold; color: #3f51b5; }
    .rating { display: flex; align-items: center; color: #ff9800; font-weight: bold; }
    mat-card-actions { padding: 16px; padding-top: 0; }
    mat-card-actions button { width: 100%; }
  `]
})
export class DestinationsComponent implements OnInit {
  destinations: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('http://localhost:5000/api/destinations').subscribe({
      next: (data: any) => {
        this.destinations = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
