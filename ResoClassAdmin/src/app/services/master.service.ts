import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  //private baseUrl: string = 'https://dsquad.services/api';
  // private baseUrl: string = 'https://api.resoclass.com/api';
  private baseUrl: string = 'https://localhost:7292/api';
  constructor(private http: HttpClient) {}

  getAll(type: string, apiName: string) {
    return this.http.get(`${this.baseUrl}/${type}/${apiName}`);
  }

  getListItems(itemName: string, parentName: string, parentId: number) {
    return this.http.get(
      `${this.baseUrl}/Home/GetListItems?itemName=${itemName}&parentName=${parentName}&parentId=${parentId}`
    );
  }

  getById(id: any, type: string, apiName: string, idParamName: string = 'id') {
    return this.http.get(
      `${this.baseUrl}/${type}/${apiName}?${idParamName}=${id}`
    );
  }

  post(obj: any, type: string, apiName: string) {
    return this.http.post(`${this.baseUrl}/${type}/${apiName}`, obj);
  }

  postWithFile(
    request: any,
    thumbnailFile: File | undefined,
    type: string,
    apiName: string
  ) {
    const formData = new FormData();
    formData.append('request', JSON.stringify(request));
    if (thumbnailFile !== undefined) {
      formData.append('thumbnail', thumbnailFile);
    }

    return this.http.post(`${this.baseUrl}/${type}/${apiName}`, formData);
  }

  UploadQuestions(
    request: any,
    thumbnailFile: File | undefined,
    type: string,
    apiName: string
  ) {
    const formData = new FormData();
    formData.append('request', JSON.stringify(request));
    if (thumbnailFile !== undefined) {
      formData.append('document', thumbnailFile);
    }

    return this.http.post(`${this.baseUrl}/${type}/${apiName}`, formData);
  }

  putWithFile(
    request: any,
    thumbnailFile: File | undefined,
    type: string,
    apiName: string
  ) {
    const formData = new FormData();
    formData.append('request', JSON.stringify(request));
    if (thumbnailFile !== undefined) {
      formData.append('thumbnail', thumbnailFile);
    }
    return this.http.put(`${this.baseUrl}/${type}/${apiName}`, formData);
  }

  put(obj: any, type: string, apiName: string) {
    return this.http.put(`${this.baseUrl}/${type}/${apiName}/${obj.id}`, obj);
  }

  delete(id: any, type: string, apiName: string) {
    return this.http.delete(`${this.baseUrl}/${type}/${apiName}/${id}`);
  }

  authenticate(obj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/User/Authenticate`, obj);
  }

  upload(file: FormData, type: string, apiName: string) {
    return this.http.post(`${this.baseUrl}/${type}/${apiName}`, file);
  }

  uploadImage(imageFile: File, type: string, apiName: string) {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post(`${this.baseUrl}/${type}/${apiName}`, formData);
  }
  getAllByObject(obj: any, type: string, apiName: string) {
    return this.http.post(`${this.baseUrl}/${type}/${apiName}`, obj);
  }

  getAssessmentsByStudentId(id: any, type: string, apiName: string, idParamName: string = 'id') {
    return this.http.get(
      `${this.baseUrl}/${type}/${apiName}?${idParamName}=${id}`
    );
  }
}
