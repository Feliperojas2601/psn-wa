import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationDetailComponent } from './components/conversation-detail/conversation-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageModule } from '../message/message.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConversationListComponent,
    ConversationDetailComponent, 
  ],
  imports: [
    CommonModule, 
    SharedModule, 
    MessageModule, 
    ReactiveFormsModule
  ]
})
export class ConversationModule { }
