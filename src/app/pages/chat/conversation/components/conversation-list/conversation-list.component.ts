import { Component } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent {

  public conversations: Conversation[] = [{
    id: '1',
    membersId: [1, 2],  
    createDate: new Date(),
    updateDate: new Date(),
  }];

  constructor(private router: Router) {}

  public navigateToConversation(id: number): void {
    const currentUrl = this.router.url;
    const newUrl = `${currentUrl}/${id}`;
    this.router.navigateByUrl(newUrl);
  }

}
