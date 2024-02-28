import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private baseUrl: string = 'https://localhost:7292/api';
  constructor(private http: HttpClient) {}

  public post(obj: any, apiName: string): Observable<any> {
    const header = new HttpHeaders({
      contentType: 'application/json',
    });
    return this.http.post<any>(`${this.baseUrl}/${apiName}`, obj, {
      headers: header,
    });
  }

  public fetchDataWithToken(apiName: string) {
    // Set the auth token in the request headers
    let token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    // Make the HTTP request with the auth token included
    return this.http.get(`${this.baseUrl}/${apiName}`, { headers });
  }
}
