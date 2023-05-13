import { Component } from '@angular/core';
import { Notification } from './notifications/models/notification.model';
import { NotificationsService } from './notifications/services/notifications.service';
import { MenubarService } from 'src/app/shared/services/menubar.service';
import { AuthService } from '../auth/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  constructor(
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private menubarService: MenubarService,
  ){}

  ngOnInit(): void {
    this.notificationsService.connectToNotificationSocket(this.authService.getUserId());
    this.notificationsService.getNotificationsByUserSocket().subscribe({
      next: (resp: any) => {
        const notification: Notification = resp; 
        this.menubarService.toggleBellColor("red");
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
  }

}
