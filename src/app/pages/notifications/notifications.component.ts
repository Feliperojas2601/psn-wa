import { NotificationsService } from './services/notifications.service';
import { Notification } from './models/notification.model';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  public subscriptionToDestroy: Subscription[] = [];
  public notifications!: Notification[];

  constructor(
    private notificationsService: NotificationsService,
  ) {}
  
  ngOnInit(): void {
    this.getNotificationsByUser();
    this.getNotificationsByUserSocket();
  }

  public getNotificationsByUser(): void {
    let subGetNotificationsByUser = this.notificationsService.getNotificationsByUser().subscribe({
      next: (resp: any) => {
        this.notifications = resp.data.getNotificationsByUser;
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subGetNotificationsByUser);
  }

  public getNotificationsByUserSocket(): void {
    let subGetNotificationsByUserSocket = this.notificationsService.getNotificationsByUserSocket().subscribe({
      next: (resp: any) => {
        const notification: Notification = resp; 
        const previousNotifications: Notification[] = this.notifications;
        const newNotifications: Notification[] = [notification, ...previousNotifications];
        this.notifications = newNotifications;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    }); 
    this.subscriptionToDestroy.push(subGetNotificationsByUserSocket);    
  }

  ngOnDestroy() {
    this.subscriptionToDestroy.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
