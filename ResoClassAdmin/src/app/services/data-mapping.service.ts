import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataMappingService {
  constructor() {}

  mapToModel<T>(data: any[], mapper: (item: any) => T): T[] {
    if (!Array.isArray(data)) {
      console.error('Data is not an array.');
      return []; // return an empty array or handle the error as needed
    }
    return data.map((item) => mapper(item));
  }
}
