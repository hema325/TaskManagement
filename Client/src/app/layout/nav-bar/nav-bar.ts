import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
  imports: [
    RouterLink,
    RouterLinkActive
],
})
export class NavBar {
  protected readonly auth = inject(Auth);


  logout() {
    this.auth.logout();
  }
}
