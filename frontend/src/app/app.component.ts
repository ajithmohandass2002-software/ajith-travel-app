import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-layout">
      <mat-toolbar color="primary" class="main-toolbar">
        <span class="logo" routerLink="/">🌍 TravelGo</span>
        <span class="spacer"></span>
        
        <div class="nav-links">
          <button mat-button routerLink="/">Home</button>
          <button mat-button routerLink="/destinations">Destinations</button>
          <button mat-button routerLink="/about">About</button>
          <button mat-button routerLink="/faq">FAQ</button>
        </div>
        
        <app-theme-picker></app-theme-picker>

        <ng-container *ngIf="!(authService.currentUser$ | async); else loggedIn">
          <button mat-raised-button color="accent" routerLink="/login" class="ml-2">Login</button>
          <button mat-stroked-button routerLink="/register" class="ml-2" style="color: white; border-color: white;">Register</button>
        </ng-container>
        
        <ng-template #loggedIn>
          <button mat-button *ngIf="(authService.currentUser$ | async)?.role === 'admin'" routerLink="/admin" class="ml-2">
            Admin
          </button>
          <button mat-button routerLink="/dashboard" class="ml-2">
            My Bookings
          </button>
          <button mat-button [matMenuTriggerFor]="userMenu" class="ml-2">
            <mat-icon>account_circle</mat-icon> {{(authService.currentUser$ | async)?.name}}
          </button>
          <mat-menu #userMenu="matMenu">
            <button mat-menu-item (click)="logout()">
              <mat-icon>exit_to_app</mat-icon> Logout
            </button>
          </mat-menu>
        </ng-template>
      </mat-toolbar>

      <div class="content-container">
        <router-outlet></router-outlet>
      </div>
      
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .main-toolbar { padding: 0 2rem; box-shadow: 0 2px 5px rgba(0,0,0,0.1); z-index: 1000; position: relative; }
    .logo { font-weight: bold; font-size: 1.5rem; cursor: pointer; }
    .spacer { flex: 1 1 auto; }
    .nav-links { display: flex; align-items: center; margin-right: 15px; }
    .nav-links button { opacity: 0.9; }
    .nav-links button:hover { opacity: 1; }
    .content-container { 
      flex: 1;
      padding-bottom: 40px; 
    }
    .ml-2 { margin-left: 10px; }
    
    @media (max-width: 800px) {
      .nav-links { display: none; }
    }
  `]
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
