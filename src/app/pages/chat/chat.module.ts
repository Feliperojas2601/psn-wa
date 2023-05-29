import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const urlChat = environment.baseUrlChatSocket;

@Injectable()
export class SocketChat extends Socket {
  constructor() {
    super({ url: urlChat, options: {
      path: "/chat/socket.io"
    } });
  }
}

@NgModule({
  declarations: [
    ChatComponent,
  ],
  imports: [
    CommonModule, 
    ConversationModule, 
    MessageModule, 
    RouterModule, 
    SharedModule
  ], 
  providers: [
    SocketChat,
  ]
})
export class ChatModule { }
