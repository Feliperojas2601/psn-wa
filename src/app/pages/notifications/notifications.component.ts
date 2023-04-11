import { Component } from '@angular/core';
import { Notification } from './models/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  public notifications: Notification[] = [
  {
    id: '1',
    title: 'Notification 1',
    content: 'Content 1',
    actorId: 1,
    notifierId: 2,
    createDate: new Date(),
    type: 'type 1',
  }, 
  {
    id: '1',
    title: 'Notification 1',
    content: 'Content 1',
    actorId: 1,
    notifierId: 2,
    createDate: new Date(),
    type: 'type 1',
  }, 
];
}
