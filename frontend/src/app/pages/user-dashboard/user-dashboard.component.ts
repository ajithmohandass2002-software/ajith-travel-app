import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-dashboard',
  template: `
    <div class="dashboard-container">
      <h1>My Bookings</h1>

      <div *ngIf="loading" class="spinner-container">
        <mat-spinner diameter="40"></mat-spinner>
      </div>

      <div *ngIf="!loading && bookings.length === 0" class="no-bookings">
        <mat-icon>flight_takeoff</mat-icon>
        <h3>You have no bookings yet.</h3>
        <button mat-raised-button color="primary" routerLink="/destinations">Explore Destinations</button>
      </div>

      <div class="booking-list" *ngIf="!loading && bookings.length > 0">
        <mat-card *ngFor="let booking of bookings" class="booking-card">
          <div class="booking-content">
            <div class="booking-info">
              <h3>{{booking.packageId?.title}}</h3>
              <p class="destination">{{booking.packageId?.destinationId?.name}}</p>
              
              <div class="details-grid">
                <span><mat-icon inline>event</mat-icon> {{booking.travelDate | date:'longDate'}}</span>
                <span><mat-icon inline>group</mat-icon> {{booking.numberOfTravelers}} Travelers</span>
                <span><mat-icon inline>payments</mat-icon> Status: <span class="status-badge {{booking.status}}">{{booking.status}}</span></span>
              </div>
            </div>
            <div class="booking-actions">
              <div class="total-price">\${{ (booking.packageId?.price || 0) * booking.numberOfTravelers }}</div>
              <button mat-stroked-button color="warn" *ngIf="booking.status !== 'cancelled'" (click)="cancelBooking(booking._id)">Cancel Booking</button>
            </div>
          </div>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 40px; max-width: 1000px; margin: 0 auto; }
    h1 { font-size: 2.2rem; margin-bottom: 30px; text-align: center; }
    .spinner-container, .no-bookings { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; }
    .no-bookings mat-icon { font-size: 60px; height: 60px; width: 60px; color: #bdbdbd; margin-bottom: 20px; }
    
    .booking-list { display: flex; flex-direction: column; gap: 20px; }
    .booking-card { padding: 0; overflow: hidden; }
    .booking-content { display: flex; flex-direction: row; justify-content: space-between; padding: 20px; }
    @media (max-width: 600px) { .booking-content { flex-direction: column; gap: 20px; } }
    
    .booking-info h3 { margin: 0 0 5px 0; font-size: 1.5rem; }
    .destination { color: #757575; font-size: 1.1rem; margin-bottom: 15px; }
    .details-grid { display: grid; grid-template-columns: 1fr; gap: 10px; color: #555; }
    
    .status-badge { padding: 4px 8px; border-radius: 4px; font-weight: bold; text-transform: uppercase; font-size: 0.8rem; }
    .status-badge.pending { background: #fff3e0; color: #e65100; }
    .status-badge.confirmed { background: #e8f5e9; color: #2e7d32; }
    .status-badge.cancelled { background: #ffebee; color: #c62828; }

    .booking-actions { display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; }
    .total-price { font-size: 1.8rem; font-weight: bold; color: #3f51b5; margin-bottom: 15px; }
  `]
})
export class UserDashboardComponent implements OnInit {
  bookings: any[] = [];
  loading = true;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings() {
    this.http.get<any[]>('http://localhost:5000/api/bookings/mybookings').subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error fetching bookings', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  cancelBooking(id: string) {
    if(confirm('Are you sure you want to cancel this booking?')) {
      this.http.put(`http://localhost:5000/api/bookings/\${id}/cancel`, {}).subscribe({
        next: () => {
          this.snackBar.open('Booking cancelled', 'Close', { duration: 3000 });
          this.fetchBookings();
        },
        error: () => {
          this.snackBar.open('Error cancelling booking', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
