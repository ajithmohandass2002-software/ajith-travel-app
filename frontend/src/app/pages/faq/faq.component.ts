import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  template: `
    <div class="faq-container">
      <h1>Frequently Asked Questions</h1>
      <p class="subtitle">Everything you need to know about booking with TravelGo.</p>

      <div class="faq-grid">
        <mat-card *ngFor="let item of faqs" class="faq-card">
          <mat-card-header>
            <mat-card-title>{{item.q}}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>{{item.a}}</p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="still-questions">
        <h3>Still have questions?</h3>
        <p>Can't find the answer you're looking for? Please chat with our friendly team.</p>
        <button mat-raised-button color="primary" routerLink="/contact">Get in Touch</button>
      </div>
    </div>
  `,
  styles: [`
    .faq-container { max-width: 1000px; margin: 0 auto; padding: 60px 20px; text-align: center; }
    h1 { font-size: 2.5rem; margin-bottom: 10px; }
    .subtitle { color: #666; font-size: 1.2rem; margin-bottom: 50px; }
    .faq-grid { display: flex; flex-direction: column; gap: 20px; text-align: left; }
    .faq-card { border-radius: 8px; transition: box-shadow 0.3s; }
    .faq-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    mat-card-title { font-size: 1.2rem; font-weight: 500; margin-bottom: 10px; }
    mat-card-content p { color: #555; line-height: 1.5; }
    .still-questions { margin-top: 80px; padding: 40px; background: #f9f9f9; border-radius: 12px; }
    .still-questions h3 { font-size: 1.8rem; margin-bottom: 15px; }
    .still-questions p { margin-bottom: 25px; color: #666; }
  `]
})
export class FaqComponent {
  faqs = [
    { q: 'How do I book a travel package?', a: 'To book a package, simply browse our destinations, select a package that suits you, and click on "Book Now". You will need to be logged in to complete the booking.' },
    { q: 'What payment methods do you accept?', a: 'We currently accept all major credit cards, PayPal, and bank transfers. Payments are processed securely via our encrypted gateway.' },
    { q: 'Can I cancel my booking?', a: 'Yes, you can cancel your booking from your profile dashboard under "My Bookings". Please note that cancellation policies vary by package.' },
    { q: 'Is travel insurance included?', a: 'Basic travel insurance is included in our "Premium" packages. For other packages, you can add insurance during the checkout process.' },
    { q: 'How do I contact customer support?', a: 'You can reach us through our Contact page, or by emailing support@travelgo.com. Our team is available 24/7.' }
  ];
}
