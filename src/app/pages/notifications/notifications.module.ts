import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatModule } from '../chat/chat.module';
import { NotificationDetailComponent } from './components/notification-detail/notification-detail.component';



@NgModule({
  declarations: [
    NotificationsComponent,
    NotificationDetailComponent
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    ChatModule
  ], 
})
export class NotificationsModule { }
