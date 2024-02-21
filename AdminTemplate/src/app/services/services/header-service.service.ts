import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  isDisplayed = false;
  private showSideNavSubject = new Subject<boolean>();

  constructor() {}

  toggleSideBar(): void {
    this.isDisplayed = !this.isDisplayed;
    this.showSideNavSubject.next(this.isDisplayed);
  }

  get(): Observable<boolean> {
    return this.showSideNavSubject.asObservable();
  }
}
