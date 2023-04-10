import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';



@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule, 
    ConversationModule, 
    MessageModule
  ]
})
export class ChatModule { }
