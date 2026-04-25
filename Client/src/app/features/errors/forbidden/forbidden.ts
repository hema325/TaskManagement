import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.html',
  styleUrl: './forbidden.css',
  imports: [
    RouterLink
  ],
})
export class Forbidden {

  goBack() {
    window.history.back();
  }
}
