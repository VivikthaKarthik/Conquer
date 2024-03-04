import { Component } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}

  removeNotification(index: number) {
    this.notificationService.removeNotification(index);
  }
}
