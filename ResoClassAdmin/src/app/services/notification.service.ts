import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  notifications: string[] = [];

  addNotification(message: string) {
    this.notifications.push(message);
  }

  removeNotification(index: number) {
    this.notifications.splice(index, 1);
  }
}

