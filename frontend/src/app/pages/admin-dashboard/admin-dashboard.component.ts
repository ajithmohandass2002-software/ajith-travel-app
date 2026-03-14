import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="admin-container">
      <h1>Admin Control Panel</h1>
      
      <mat-tab-group animationDuration="200ms" color="accent">
        <!-- BOOKINGS TAB -->
        <mat-tab label="Bookings">
          <div class="tab-content">
            <div *ngIf="loading" class="spinner-container">
              <mat-spinner diameter="40"></mat-spinner>
            </div>
            
            <table mat-table [dataSource]="bookings" class="mat-elevation-z8 admin-table" *ngIf="!loading">
              <ng-container matColumnDef="user">
                <th mat-header-cell *matHeaderCellDef> User </th>
                <td mat-cell *matCellDef="let element"> {{element.userId?.name}} </td>
              </ng-container>

              <ng-container matColumnDef="package">
                <th mat-header-cell *matHeaderCellDef> Package </th>
                <td mat-cell *matCellDef="let element"> {{element.packageId?.title}} </td>
              </ng-container>

              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef> Travel Date </th>
                <td mat-cell *matCellDef="let element"> {{element.travelDate | date}} </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef> Status </th>
                <td mat-cell *matCellDef="let element">
                  <span class="status-badge {{element.status}}">{{element.status}}</span>
                </td>
              </ng-container>

              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Actions </th>
                <td mat-cell *matCellDef="let element">
                  <button mat-icon-button color="warn" matTooltip="Cancel Booking" *ngIf="element.status !== 'cancelled'" (click)="cancelBooking(element._id)">
                    <mat-icon>cancel</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-tab>
        
        <!-- DESTINATIONS TAB -->
        <mat-tab label="Destinations">
          <div class="tab-content">
            <div class="action-header">
              <h2>All Destinations</h2>
              <button mat-raised-button color="primary" (click)="showDestForm = !showDestForm">
                {{ showDestForm ? 'Close Form' : 'Add New Destination' }}
              </button>
            </div>

            <mat-card *ngIf="showDestForm" class="mgmt-card mb-4">
              <form [formGroup]="destForm" (ngSubmit)="addDestination()">
                <div class="form-grid">
                  <mat-form-field appearance="outline">
                    <mat-label>Name</mat-label>
                    <input matInput formControlName="name" placeholder="e.g. Paris">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Country</mat-label>
                    <input matInput formControlName="country" placeholder="e.g. France">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Price (Starting From)</mat-label>
                    <input matInput type="number" formControlName="price">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Rating</mat-label>
                    <input matInput type="number" formControlName="rating" step="0.1" min="0" max="5">
                  </mat-form-field>
                </div>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Description</mat-label>
                  <textarea matInput formControlName="description" rows="3"></textarea>
                </mat-form-field>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Image URL</mat-label>
                  <input matInput formControlName="imageUrl">
                </mat-form-field>
                <div class="actions">
                  <button mat-raised-button color="accent" type="submit" [disabled]="destForm.invalid">Save Destination</button>
                </div>
              </form>
            </mat-card>

            <table mat-table [dataSource]="destinations" class="mat-elevation-z8 admin-table">
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef> Name </th>
                <td mat-cell *matCellDef="let element"> {{element.name}} </td>
              </ng-container>
              <ng-container matColumnDef="country">
                <th mat-header-cell *matHeaderCellDef> Country </th>
                <td mat-cell *matCellDef="let element"> {{element.country}} </td>
              </ng-container>
              <ng-container matColumnDef="price">
                <th mat-header-cell *matHeaderCellDef> Price </th>
                <td mat-cell *matCellDef="let element"> \${{element.price}} </td>
              </ng-container>
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Actions </th>
                <td mat-cell *matCellDef="let element">
                  <button mat-icon-button color="warn" (click)="deleteDestination(element._id)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="['name', 'country', 'price', 'actions']"></tr>
              <tr mat-row *matRowDef="let row; columns: ['name', 'country', 'price', 'actions'];"></tr>
            </table>
          </div>
        </mat-tab>

        <!-- PACKAGES TAB -->
        <mat-tab label="Packages">
          <div class="tab-content">
            <div class="action-header">
              <h2>All Packages</h2>
              <button mat-raised-button color="primary" (click)="showPkgForm = !showPkgForm">
                {{ showPkgForm ? 'Close Form' : 'Add New Package' }}
              </button>
            </div>

            <mat-card *ngIf="showPkgForm" class="mgmt-card mb-4">
              <form [formGroup]="pkgForm" (ngSubmit)="addPackage()">
                <div class="form-grid">
                  <mat-form-field appearance="outline">
                    <mat-label>Title</mat-label>
                    <input matInput formControlName="title">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Destination</mat-label>
                    <mat-select formControlName="destinationId">
                      <mat-option *ngFor="let d of destinations" [value]="d._id">{{d.name}}</mat-option>
                    </mat-select>
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Price</mat-label>
                    <input matInput type="number" formControlName="price">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Days</mat-label>
                    <input matInput type="number" formControlName="durationDays">
                  </mat-form-field>
                </div>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Description</mat-label>
                  <textarea matInput formControlName="description"></textarea>
                </mat-form-field>
                <div class="actions">
                  <button mat-raised-button color="accent" type="submit" [disabled]="pkgForm.invalid">Save Package</button>
                </div>
              </form>
            </mat-card>

            <table mat-table [dataSource]="packages" class="mat-elevation-z8 admin-table">
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef> Title </th>
                <td mat-cell *matCellDef="let element"> {{element.title}} </td>
              </ng-container>
              <ng-container matColumnDef="dest">
                <th mat-header-cell *matHeaderCellDef> Destination </th>
                <td mat-cell *matCellDef="let element"> {{element.destinationId?.name}} </td>
              </ng-container>
              <ng-container matColumnDef="price">
                <th mat-header-cell *matHeaderCellDef> Price </th>
                <td mat-cell *matCellDef="let element"> \${{element.price}} </td>
              </ng-container>
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef> Actions </th>
                <td mat-cell *matCellDef="let element">
                  <button mat-icon-button color="warn" (click)="deletePackage(element._id)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="['title', 'dest', 'price', 'actions']"></tr>
              <tr mat-row *matRowDef="let row; columns: ['title', 'dest', 'price', 'actions'];"></tr>
            </table>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .admin-container { padding: 40px; max-width: 1200px; margin: 0 auto; }
    h1 { font-size: 2.2rem; margin-bottom: 30px; text-align: center; }
    .tab-content { padding: 20px 0; }
    .action-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .mgmt-card { padding: 25px; border-radius: 12px; }
    .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .full-width { width: 100%; }
    .mb-4 { margin-bottom: 24px; }
    .actions { display: flex; justify-content: flex-end; margin-top: 10px; }
    
    .admin-table { width: 100%; margin-top: 10px; }
    .status-badge { padding: 4px 8px; border-radius: 4px; font-weight: bold; text-transform: uppercase; font-size: 0.8rem; }
    .status-badge.pending { background: #fff3e0; color: #e65100; }
    .status-badge.confirmed { background: #e8f5e9; color: #2e7d32; }
    .status-badge.cancelled { background: #ffebee; color: #c62828; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  bookings: any[] = [];
  destinations: any[] = [];
  packages: any[] = [];
  loading = true;
  showDestForm = false;
  showPkgForm = false;
  
  destForm: FormGroup;
  pkgForm: FormGroup;
  
  displayedColumns: string[] = ['user', 'package', 'date', 'status', 'actions'];

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.destForm = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      rating: [5, Validators.required],
      imageUrl: ['']
    });

    this.pkgForm = this.fb.group({
      title: ['', Validators.required],
      destinationId: ['', Validators.required],
      durationDays: [3, Validators.required],
      price: [500, Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.refreshAll();
  }

  refreshAll() {
    this.fetchBookings();
    this.fetchDestinations();
    this.fetchPackages();
  }

  fetchBookings() {
    this.http.get<any[]>('http://localhost:5000/api/bookings').subscribe(data => {
      this.bookings = data;
      this.loading = false;
    });
  }

  fetchDestinations() {
    this.http.get<any[]>('http://localhost:5000/api/destinations').subscribe(data => this.destinations = data);
  }

  fetchPackages() {
    this.http.get<any[]>('http://localhost:5000/api/packages').subscribe(data => this.packages = data);
  }

  addDestination() {
    const payload = { ...this.destForm.value, images: [this.destForm.value.imageUrl] };
    this.http.post('http://localhost:5000/api/destinations', payload).subscribe(() => {
      this.snackBar.open('Destination Added!', 'OK', { duration: 3000 });
      this.destForm.reset();
      this.showDestForm = false;
      this.fetchDestinations();
    });
  }

  addPackage() {
    this.http.post('http://localhost:5000/api/packages', this.pkgForm.value).subscribe(() => {
      this.snackBar.open('Package Added!', 'OK', { duration: 3000 });
      this.pkgForm.reset();
      this.showPkgForm = false;
      this.fetchPackages();
    });
  }

  deleteDestination(id: string) {
    if(confirm('Warning: Deleting a destination will leave associated packages without a destination. Continue?')) {
      this.http.delete(`http://localhost:5000/api/destinations/\${id}`).subscribe(() => {
        this.fetchDestinations();
      });
    }
  }

  deletePackage(id: string) {
    if(confirm('Delete this package?')) {
      this.http.delete(`http://localhost:5000/api/packages/\${id}`).subscribe(() => {
        this.fetchPackages();
      });
    }
  }

  cancelBooking(id: string) {
    this.http.put(`http://localhost:5000/api/bookings/\${id}/cancel`, {}).subscribe(() => {
      this.fetchBookings();
    });
  }
}
