import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title>Create an Account</mat-card-title>
          <mat-card-subtitle>Join TravelGo and explore the world.</mat-card-subtitle>
        </mat-card-header>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <mat-card-content>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="name" placeholder="John Doe" required>
              <mat-error *ngIf="registerForm.get('name')?.hasError('required')">Name is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="pat@example.com" required>
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">Please enter a valid email address</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" type="password" required>
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">Password is required</mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">Password must be at least 6 characters</mat-error>
            </mat-form-field>
            
            <mat-error *ngIf="errorMsg">{{ errorMsg }}</mat-error>
          </mat-card-content>

          <mat-card-actions class="actions">
            <button mat-raised-button color="accent" type="submit" [disabled]="registerForm.invalid || loading">
              {{ loading ? 'Creating Account...' : 'Register' }}
            </button>
            <button mat-button type="button" routerLink="/login">Already have an account?</button>
          </mat-card-actions>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-container { display: flex; justify-content: center; align-items: center; height: 100%; background-color: #f5f5f5; }
    .auth-card { width: 100%; max-width: 400px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 8px; }
    mat-card-header { justify-content: center; text-align: center; margin-bottom: 20px; }
    .full-width { width: 100%; margin-bottom: 10px; }
    .actions { display: flex; flex-direction: column; gap: 10px; padding: 0 16px; margin-bottom: 10px; }
    .actions button { width: 100%; }
  `]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMsg = '';
    
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
