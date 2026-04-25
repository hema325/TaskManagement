import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './layout/nav-bar/nav-bar';
import { Footer } from './layout/footer/footer';
import { Auth } from './core/services/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    RouterOutlet,
    NavBar,
    Footer
  ],
})
export class App {
  protected readonly title = signal('Client');
  private readonly auth = inject(Auth);

  ngOnInit() {
    this.auth.relogin();
  }
}
