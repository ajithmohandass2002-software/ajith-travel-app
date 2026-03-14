import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme-picker',
  template: `
    <button mat-icon-button (click)="toggleTheme()" [matTooltip]="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
      <mat-icon>{{ isDark ? 'light_mode' : 'dark_mode' }}</mat-icon>
    </button>
  `,
  styles: [`
    button { margin-left: auto; }
  `]
})
export class ThemePickerComponent {
  isDark = false;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
    // Check if user previously selected dark mode
    const savedTheme = localStorage.getItem('travelTheme');
    if (savedTheme === 'dark') {
      this.isDark = true;
      this.renderer.addClass(this.document.body, 'dark-theme');
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    
    if (this.isDark) {
      this.renderer.addClass(this.document.body, 'dark-theme');
      localStorage.setItem('travelTheme', 'dark');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-theme');
      localStorage.setItem('travelTheme', 'light');
    }
  }
}
