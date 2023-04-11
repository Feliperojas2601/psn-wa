import { Component, Input } from '@angular/core';
import { Notification } from '../../models/notification.model';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.css']
})
export class NotificationDetailComponent {
  @Input() notification!: Notification;
}
