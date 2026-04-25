import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private readonly baseUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);

  create(data: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(this.baseUrl + '/api/users', data);
  }

  changePermission(data: any): Observable<Result<null>> {
    return this.httpClient.put<Result<null>>(this.baseUrl + '/api/users', data);
  }

  delete(id: number): Observable<Result<null>> {
    return this.httpClient.delete<Result<null>>(this.baseUrl + '/api/users/'+ id);
  }

  get(id:number): Observable<Result<User>> {
    return this.httpClient.get<Result<User>>(this.baseUrl + '/api/users/' + id);
  }


  getAll(): Observable<Result<User[]>> {
    return this.httpClient.get<Result<User[]>>(this.baseUrl + '/api/users');
  }

  userNameExists(userName: string): Observable<Result<boolean>> {
    return this.httpClient.get<Result<boolean>>(this.baseUrl + '/api/users/exists/' + userName);
  }
}
