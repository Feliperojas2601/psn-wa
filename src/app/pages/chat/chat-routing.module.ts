import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatComponent } from './chat.component';
import { ConversationListComponent } from './conversation/components/conversation-list/conversation-list.component';
import { ConversationDetailComponent } from './conversation/components/conversation-detail/conversation-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      { 
        path: '', 
        component: ConversationListComponent
      },
      { 
        path: ':id/:username/:membersId', 
        component:  ConversationDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
