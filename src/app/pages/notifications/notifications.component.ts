import { Component } from '@angular/core';
import { Notification } from './models/notification.model';
import { NotificationsService } from './services/notifications.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  public notifications!: Notification[];

  constructor(
    private notificationsService: NotificationsService,
    private authServices: AuthService,
  ) {}
  
  ngOnInit(): void {
    this.notificationsService.getNotificationsByUser()
    .subscribe(
      {
        next: (resp: any) => {
          console.log(resp);
          this.notifications = resp.data.getNotificationsByUser;
        }, 
        error: (err: any) => Swal.fire('Error', err.error.msg, 'error')
      }
    );
    this.notificationsService.connectToNotificationSocket(this.authServices.getUserId());
    this.notificationsService.getNotificationsByUserSocket().subscribe({
      next: (resp: any) => {
        console.log(resp)
        const notification: Notification = resp; 
        const previousNotifications: Notification[] = this.notifications;
        const newNotifications: Notification[] = [...previousNotifications, notification];
        this.notifications = newNotifications;
      },
      error: (err: any) => Swal.fire('Error', err.error.msg, 'error')
    }); 
  }
}
