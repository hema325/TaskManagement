import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Session } from '../models/session';
import { Result } from '../models/result';
import { Permissions } from '../enums/permissions'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly sessionKey = 'session';
  private readonly baseUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);
  private readonly _session = signal<Session | null>(null);

  public readonly isLoggedIn = computed<boolean>(() => this._session() != null);
  public readonly session = this._session.asReadonly();

  login(data: any): Observable<Result<Session>> {
    return this.httpClient
    .post<Result<Session>>(this.baseUrl + '/api/auth/login', data)
    .pipe(tap(res => {

      if(res.isSuccess) 
      {
          this._session.set(res.data);
          localStorage.setItem(this.sessionKey, JSON.stringify(res.data));
      }
    }));
  }

  logout() {
    this._session.set(null);
    localStorage.removeItem(this.sessionKey);
  }

  relogin() {
    const json = localStorage.getItem(this.sessionKey);
    
    if(!json)
      return;

      try {
        const session = JSON.parse(json) as Session;
        if(new Date(session.expiresAt) > new Date()) {
          this._session.set(session);
        }
        else {
          this.logout();
        }
      }
      catch {
        this.logout();
      }
  }
}

