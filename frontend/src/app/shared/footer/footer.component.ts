import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h2 class="footer-logo">🌍 TravelGo</h2>
          <p>Your trusted partner for worldwide adventures and unforgettable memories.</p>
        </div>

        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a routerLink="/destinations">Destinations</a></li>
            <li><a routerLink="/about">About Us</a></li>
            <li><a routerLink="/faq">FAQ</a></li>
            <li><a routerLink="/contact">Contact</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><a>Privacy Policy</a></li>
            <li><a>Terms of Service</a></li>
            <li><a>Cookie Policy</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Follow Us</h3>
          <div class="social-icons">
            <mat-icon>facebook</mat-icon>
            <mat-icon>camera_alt</mat-icon>
            <mat-icon>alternate_email</mat-icon>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 TravelGo. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer { 
      background: #1a1a1a; 
      color: #ccc; 
      padding: 60px 0 20px 0; 
      margin-top: auto; 
    }
    .footer-container { 
      max-width: 1200px; 
      margin: 0 auto; 
      display: grid; 
      grid-template-columns: 1.5fr 1fr 1fr 1fr; 
      gap: 40px; 
      padding: 0 20px;
    }
    @media (max-width: 768px) {
      .footer-container { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 480px) {
      .footer-container { grid-template-columns: 1fr; }
    }
    
    .footer-logo { color: white; margin-bottom: 20px; font-size: 1.8rem; }
    h3 { color: white; margin-bottom: 20px; font-size: 1.2rem; }
    
    ul { list-style: none; padding: 0; margin: 0; }
    ul li { margin-bottom: 12px; }
    ul li a { color: #ccc; text-decoration: none; transition: color 0.3s; cursor: pointer; }
    ul li a:hover { color: white; }
    
    .social-icons { display: flex; gap: 15px; }
    .social-icons mat-icon { cursor: pointer; transition: color 0.3s; }
    .social-icons mat-icon:hover { color: white; }
    
    .footer-bottom { 
      margin-top: 60px; 
      padding-top: 20px; 
      border-top: 1px solid #333; 
      text-align: center; 
      font-size: 0.9rem;
    }
  `]
})
export class FooterComponent {
}
