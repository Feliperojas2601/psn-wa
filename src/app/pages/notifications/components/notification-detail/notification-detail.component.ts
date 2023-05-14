import { Notification } from '../../models/notification.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent {
  @Input() notification!: Notification;
}
