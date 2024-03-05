import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  requiredIfEmptyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isEmpty = control.value === '' || control.value === null;
      return isEmpty ? { 'requiredIfEmpty': { value: control.value } } : null;
    };
  }
}
