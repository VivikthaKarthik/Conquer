import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private baseUrl: string = 'https://localhost:7292/api/User/Authenticate';
  constructor(private http: HttpClient) {}

  public post(obj: any, api: string): Observable<any> {
    const header = new HttpHeaders({
      contentType: 'application/json',
    });
    return this.http.post<any>(this.baseUrl, obj, { headers: header });
  }
}
