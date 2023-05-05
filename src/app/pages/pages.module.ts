import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PostsModule } from './posts/posts.module';
import { UserrsModule } from './userrs/userrs.module';
import { UserModule } from './user/user.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const urlChat = environment.baseUrlChatSocket;
const urlNotification = environment.baseUrlNotificationSocket;

@Injectable()
export class SocketChat extends Socket {
  constructor() {
    super({ url: urlChat, options: {} });
  }
}

@Injectable()
export class SocketNotification extends Socket {
  constructor() {
    super({ url: urlNotification, options: {} });
  }
}


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
  providers: [SocketChat, SocketNotification],
})
export class PagesModule { }
