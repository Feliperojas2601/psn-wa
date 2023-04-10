import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationDetailComponent } from './components/conversation-detail/conversation-detail.component';



@NgModule({
  declarations: [
    ConversationListComponent,
    ConversationDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ConversationModule { }
