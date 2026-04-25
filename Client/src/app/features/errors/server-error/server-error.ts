import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
  imports: [
    RouterLink
  ],
})
export class ServerError {

  reload() {
    window.location.reload()
  }
}
