import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title>Welcome Back</mat-card-title>
          <mat-card-subtitle>Login to your account to book travels.</mat-card-subtitle>
        </mat-card-header>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-card-content>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="Ex. pat@example.com" required>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Please enter a valid email address</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" type="password" required>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
            </mat-form-field>
            
            <mat-error *ngIf="errorMsg">{{ errorMsg }}</mat-error>
          </mat-card-content>

          <mat-card-actions class="actions">
            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid || loading">
              {{ loading ? 'Logging in...' : 'Login' }}
            </button>
            <button mat-button type="button" routerLink="/register">Need an account?</button>
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
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMsg = '';
    
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Action failed. Are your credentials correct?';
        this.loading = false;
      }
    });
  }
}
