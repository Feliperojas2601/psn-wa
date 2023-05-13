import { Component } from '@angular/core';
import { Notification } from './models/notification.model';
import { NotificationsService } from './services/notifications.service';
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
    let subscriptionNotificationSocket = this.notificationsService.getNotificationsByUser().subscribe(
      {
        next: (resp: any) => {
          this.notifications = resp.data.getNotificationsByUser;
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }
    );

    let subscriptionNotification = this.notificationsService.getNotificationsByUserSocket().subscribe({
      next: (resp: any) => {
        const notification: Notification = resp; 
        const previousNotifications: Notification[] = this.notifications;
        const newNotifications: Notification[] = [notification, ...previousNotifications];
        this.notifications = newNotifications;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    }); 

    this.subscriptionToDestroy.push(subscriptionNotification);    
    this.subscriptionToDestroy.push(subscriptionNotificationSocket);    
  }

  ngOnDestroy() {
    this.subscriptionToDestroy.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
