import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

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
  exports: [
    
  ]
})
export class ChatModule { }
