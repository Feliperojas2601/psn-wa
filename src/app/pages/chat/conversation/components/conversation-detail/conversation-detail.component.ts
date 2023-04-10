import { Component } from '@angular/core';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.css']
})
export class ConversationDetailComponent {

  public messages = [
  {
    id: 'sadds',
    content: 'Hello World',
    userId: 1,
    conversationId: 'asdassd',
    createDate: new Date(),
    updateDate:new Date(),
    active: true,
  }, 
  {
    id: 'sadds',
    content: 'Hello World',
    userId: 1,
    conversationId: 'asdassd',
    createDate: new Date(),
    updateDate:new Date(),
    active: false,
  }, 
];

}
