import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { NotificationDetailComponent } from './components/notification-detail/notification-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const urlNotification = environment.baseUrlNotificationSocket;

@Injectable()
export class SocketNotification extends Socket {
  constructor() {
    super({ url: urlNotification, options: {
      path: "/notification/socket.io"
    } });
  }
}

@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationDetailComponent
  ],
  imports: [
    CommonModule, 
    SharedModule, 
  ], 
  providers: [
    SocketNotification,
  ]
})
export class NotificationsModule { }
