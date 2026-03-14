import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  template: `
    <div class="contact-container">
      <div class="contact-grid">
        <div class="contact-info">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Our friendly team is always here to chat.</p>
          
          <div class="info-items">
            <div class="info-item">
              <mat-icon color="primary">email</mat-icon>
              <div>
                <h4>Chat to us</h4>
                <p>support@travelgo.com</p>
              </div>
            </div>
            <div class="info-item">
              <mat-icon color="primary">location_on</mat-icon>
              <div>
                <h4>Visit us</h4>
                <p>123 Travel Lane, Adventure City, World</p>
              </div>
            </div>
            <div class="info-item">
              <mat-icon color="primary">phone</mat-icon>
              <div>
                <h4>Call us</h4>
                <p>+1 (555) 000-Travel</p>
              </div>
            </div>
          </div>
        </div>

        <mat-card class="contact-card">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" placeholder="Your Name">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" placeholder="email@example.com">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Subject</mat-label>
              <input matInput formControlName="subject" placeholder="What is this about?">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Message</mat-label>
              <textarea matInput formControlName="message" rows="5" placeholder="How can we help?"></textarea>
            </mat-form-field>

            <button mat-raised-button color="primary" class="submit-btn" [disabled]="contactForm.invalid">
              Send Message
            </button>
          </form>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .contact-container { max-width: 1200px; margin: 0 auto; padding: 80px 20px; }
    .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 60px; align-items: flex-start; }
    @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; gap: 40px; } }
    
    h1 { font-size: 3rem; margin-bottom: 15px; }
    .contact-info p { color: #666; font-size: 1.2rem; margin-bottom: 40px; }
    
    .info-items { display: flex; flex-direction: column; gap: 30px; }
    .info-item { display: flex; gap: 20px; align-items: flex-start; }
    .info-item mat-icon { font-size: 28px; height: 28px; width: 28px; margin-top: 5px; }
    .info-item h4 { margin: 0 0 5px 0; font-size: 1.1rem; }
    .info-item p { color: #666; margin: 0; font-size: 1rem; }
    
    .contact-card { padding: 30px; }
    .full-width { width: 100%; margin-bottom: 10px; }
    .submit-btn { width: 100%; padding: 10px; font-size: 1.1rem; height: 50px; }
  `]
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.contactForm.valid) {
      this.snackBar.open('Message sent! We will get back to you soon.', 'Close', { duration: 5000 });
      this.contactForm.reset();
    }
  }
}
