import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class Tasks {
  private readonly baseUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);

  create(data: any): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(this.baseUrl + '/api/tasks', data);
  }

  update(data: any): Observable<Result<null>> {
    return this.httpClient.put<Result<null>>(this.baseUrl + '/api/tasks', data);
  }

  delete(id: number): Observable<Result<null>> {
    return this.httpClient.delete<Result<null>>(this.baseUrl + '/api/tasks/' + id);
  }

  get(id: number): Observable<Result<Task>> {
    return this.httpClient.get<Result<Task>>(this.baseUrl + '/api/tasks/' + id);
  }

  getAll(userId: number | null = null): Observable<Result<Task[]>> {
    
    let params = new HttpParams();
   
    if(userId)
      params = params.append('userId', userId);

    return this.httpClient.get<Result<Task[]>>(this.baseUrl + '/api/tasks', {params});
  }

  getCurrentUserTasks(): Observable<Result<Task[]>> {
    return this.httpClient.get<Result<Task[]>>(this.baseUrl + '/api/tasks/current-user-tasks');
  }

  toggleCurrentUserTask(id: number): Observable<Result<null>> {
    return this.httpClient.patch<Result<null>>(this.baseUrl + '/api/tasks/toggleTask/' + id, null);
  }
}
