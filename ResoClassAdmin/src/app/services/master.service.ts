import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class MasterService {
  //private baseUrl: string = 'https://dsquad.services/api';
  private baseUrl: string = 'https://localhost:7292/api';
  constructor(private http: HttpClient) {}

  getEmptyHeaders(): HttpHeaders {
    return new HttpHeaders().set('contentType', 'application/json');
  }

  getTokenHeaders(): HttpHeaders{
      let token = localStorage.getItem('authToken');
      return new HttpHeaders().set('Authorization', `${token}`);
  }

  getAll(type: string, apiName: string) {    
    return this.http.get(`${this.baseUrl}/${type}/${apiName}`, { headers: this.getTokenHeaders() });
  }

  getById(id:any, type: string, apiName: string) {    
    return this.http.get(`${this.baseUrl}/${type}/${apiName}?id=${id}`, { headers: this.getTokenHeaders() });
  }

  post(obj:any, type: string, apiName: string) {    
    return this.http.post(`${this.baseUrl}/${type}/${apiName}`, obj, { headers: this.getTokenHeaders() });
  }

  put(obj:any, type: string, apiName: string) {    
    return this.http.put(`${this.baseUrl}/${type}/${apiName}/${obj.id}`, obj, { headers: this.getTokenHeaders() });
  }

  delete(id:any, type: string, apiName: string) {    
    return this.http.delete(`${this.baseUrl}/${type}/${apiName}/${id}`, { headers: this.getTokenHeaders() });
  }

  authenticate(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/User/Authenticate`, obj, { headers: this.getEmptyHeaders() });
  }

  upload(file:FormData, type: string, apiName: string) {    
    return this.http.post(`${this.baseUrl}/${type}/${apiName}`, file, { headers: this.getTokenHeaders() });
  }


}
