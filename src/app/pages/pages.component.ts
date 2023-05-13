import { Component } from '@angular/core';
import { NotificationsService } from './notifications/services/notifications.service';
import { MenubarService } from 'src/app/shared/services/menubar.service';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  public subscriptionToDestroy: Subscription[] = [];

  constructor(
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private menubarService: MenubarService,
  ){}

  ngOnInit(): void {
    this.notificationsService.connectToNotificationSocket(this.authService.getUserId());
    
    let subscriptionNotification = this.notificationsService.getNotificationsByUserSocket().subscribe({
      next: (resp: any) => {
        this.menubarService.toggleBellColor("red");
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });

    this.subscriptionToDestroy.push(subscriptionNotification);
  }

  ngOnDestroy() {
    this.subscriptionToDestroy.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
