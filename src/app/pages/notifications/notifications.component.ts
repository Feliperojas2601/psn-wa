import { Component } from '@angular/core';
import { Notification } from './models/notification.model';
import { NotificationsService } from './services/notifications.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  public notifications!: Notification[];

  constructor(
    private notificationsService: NotificationsService,
    private authService: AuthService,
  ) {}
  
  ngOnInit(): void {
    this.notificationsService.getNotificationsByUser()
    .subscribe(
      {
        next: (resp: any) => {
          this.notifications = resp.data.getNotificationsByUser;
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }
    );
    this.notificationsService.getNotificationsByUserSocket().subscribe({
      next: (resp: any) => {
        const notification: Notification = resp; 
        const previousNotifications: Notification[] = this.notifications;
        const newNotifications: Notification[] = [...previousNotifications, notification];
        this.notifications = newNotifications;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    }); 
  }
}
