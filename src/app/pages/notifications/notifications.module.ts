import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { NotificationDetailComponent } from './components/notification-detail/notification-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatModule } from '../chat/chat.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const uri = environment.baseUrlNotificationSocket;

@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationDetailComponent
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    ChatModule, 
    SocketIoModule.forRoot(
      {
        url: uri,
        options: {}
      }
    ),
  ], 
})
export class NotificationsModule { }
