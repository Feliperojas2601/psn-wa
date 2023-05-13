import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PostsModule } from './posts/posts.module';
import { UserrsModule } from './userrs/userrs.module';
import { UserModule } from './user/user.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SocketIoModule } from 'ngx-socket-io';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule, 
    ChatModule, 
    NotificationsModule, 
    PostsModule, 
    UserModule,
    UserrsModule, 
    SharedModule, 
    RouterModule, 
    SocketIoModule,
  ], 
})
export class PagesModule { }
