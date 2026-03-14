import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking-form',
  template: `
    <div class="booking-container">
      <mat-card class="booking-card">
        <mat-card-header>
          <mat-card-title>Complete Your Booking</mat-card-title>
          <mat-card-subtitle *ngIf="packageDetails">
            Booking: {{packageDetails.title}} (\${{packageDetails.price}} per person)
          </mat-card-subtitle>
        </mat-card-header>

        <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" *ngIf="packageDetails; else loadingTpl">
          <mat-card-content>
            <mat-form-field appearance="outline" class="full-width mt-3">
              <mat-label>Number of Travelers</mat-label>
              <input matInput type="number" formControlName="numberOfTravelers" min="1" max="10">
              <mat-error *ngIf="bookingForm.get('numberOfTravelers')?.hasError('required')">Required</mat-error>
              <mat-error *ngIf="bookingForm.get('numberOfTravelers')?.hasError('min')">Must be at least 1</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Travel Date</mat-label>
              <input matInput [matDatepicker]="picker" formControlName="travelDate">
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
              <mat-error *ngIf="bookingForm.get('travelDate')?.hasError('required')">Required</mat-error>
            </mat-form-field>

            <div class="total-price" *ngIf="bookingForm.valid">
              Estimated Total: \${{ getTotalPrice() }}
            </div>
          </mat-card-content>

          <mat-card-actions class="actions">
            <button mat-raised-button color="primary" type="submit" [disabled]="bookingForm.invalid || submitting">
              {{ submitting ? 'Processing...' : 'Confirm Booking' }}
            </button>
            <button mat-button type="button" (click)="goBack()">Cancel</button>
          </mat-card-actions>
        </form>

        <ng-template #loadingTpl>
          <div class="spinner-container">
            <mat-spinner diameter="40"></mat-spinner>
          </div>
        </ng-template>
      </mat-card>
    </div>
  `,
  styles: [`
    .booking-container { display: flex; justify-content: center; align-items: flex-start; padding: 40px 20px; min-height: calc(100vh - 64px); background-color: #f5f5f5; }
    .booking-card { width: 100%; max-width: 500px; }
    mat-card-header { justify-content: center; text-align: center; margin-bottom: 20px; }
    .full-width { width: 100%; margin-bottom: 10px; }
    .mt-3 { margin-top: 15px; }
    .spinner-container { display: flex; justify-content: center; padding: 40px; }
    .actions { display: flex; flex-direction: column; gap: 10px; padding: 0 16px 16px; margin-bottom: 10px; }
    .actions button { width: 100%; }
    .total-price { text-align: right; font-size: 1.2rem; font-weight: bold; color: #3f51b5; margin-bottom: 10px;}
  `]
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  packageId: string | null = null;
  packageDetails: any = null;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.bookingForm = this.fb.group({
      numberOfTravelers: [1, [Validators.required, Validators.min(1)]],
      travelDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.packageId = this.route.snapshot.paramMap.get('packageId');
    if (this.packageId) {
      this.fetchPackageDetails();
    }
  }

  fetchPackageDetails() {
    this.http.get<any>(`http://localhost:5000/api/packages/\${this.packageId}`).subscribe({
      next: (data) => {
        this.packageDetails = data;
      },
      error: () => {
        this.snackBar.open('Error loading package details.', 'Close', { duration: 3000 });
        this.goBack();
      }
    });
  }

  getTotalPrice(): number {
    return (this.packageDetails?.price || 0) * (this.bookingForm.value.numberOfTravelers || 1);
  }

  goBack() {
    this.router.navigate(['/destinations']);
  }

  onSubmit() {
    if (this.bookingForm.invalid) return;

    this.submitting = true;
    const payload = {
      packageId: this.packageId,
      numberOfTravelers: this.bookingForm.value.numberOfTravelers,
      travelDate: this.bookingForm.value.travelDate
    };

    this.http.post('http://localhost:5000/api/bookings', payload).subscribe({
      next: () => {
        this.snackBar.open('🎉 Booking confirmed successfully!', 'Awesome', { duration: 5000 });
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Booking failed', 'Close', { duration: 3000 });
        this.submitting = false;
      }
    });
  }
}
