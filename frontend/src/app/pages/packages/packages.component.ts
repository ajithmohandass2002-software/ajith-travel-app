import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-packages',
  template: `
    <div class="packages-container">
      <h2>Available Packages</h2>
      <div *ngIf="loading" class="spinner-container">
        <mat-spinner></mat-spinner>
      </div>
      
      <div *ngIf="!loading && packages.length === 0" class="no-packages">
        <mat-icon>explore_off</mat-icon>
        <h3>No packages available for this destination yet.</h3>
        <button mat-button color="primary" routerLink="/destinations">Back to Destinations</button>
      </div>

      <div class="package-grid" *ngIf="!loading && packages.length > 0">
        <mat-card *ngFor="let pkg of packages" class="pkg-card">
          <mat-card-header>
            <mat-card-title>{{pkg.title}}</mat-card-title>
            <mat-card-subtitle>{{pkg.destinationId?.name}}, {{pkg.destinationId?.country}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{pkg.description}}</p>
            <div class="pkg-details">
              <span><mat-icon inline>schedule</mat-icon> {{pkg.durationDays}} Days</span>
              <span class="price">\${{pkg.price}} / person</span>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="accent" [routerLink]="['/book', pkg._id]">Book Now</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .packages-container { padding: 40px; }
    h2 { text-align: center; font-size: 2.2rem; margin-bottom: 30px; }
    .spinner-container, .no-packages { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 300px; }
    .no-packages mat-icon { font-size: 64px; height: 64px; width: 64px; color: #9e9e9e; margin-bottom: 20px; }
    .package-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto; }
    .pkg-card { display: flex; flex-direction: column; transition: transform 0.2s; }
    .pkg-card:hover { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
    mat-card-content { flex-grow: 1; margin-top: 15px; }
    .pkg-details { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; background: #f5f5f5; padding: 10px; border-radius: 8px; font-weight: 500;}
    .price { color: #e91e63; font-size: 1.2rem; font-weight: bold; }
    mat-card-actions { padding: 16px; justify-content: flex-end; }
  `]
})
export class PackagesComponent implements OnInit {
  packages: any[] = [];
  loading = true;
  destinationId: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.destinationId = this.route.snapshot.paramMap.get('id');
    if (this.destinationId) {
      this.fetchPackages();
    }
  }

  fetchPackages() {
    this.http.get<any[]>('http://localhost:5000/api/packages').subscribe({
      next: (data) => {
        // Filter by destination since the generic endpoint returns all
        this.packages = data.filter(p => p.destinationId?._id === this.destinationId);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
