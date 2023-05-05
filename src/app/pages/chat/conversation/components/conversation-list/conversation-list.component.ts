import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
import { Router } from '@angular/router';
import { ConversationService } from '../../services/conversation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class ConversationListComponent implements OnInit {

  public conversations!: Conversation[];

  constructor(
    private conversationService: ConversationService,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    this.conversationService.getConversationsByUser()
    .subscribe(
      {
        next: (resp: any) => {
          this.conversations = resp.data.getConversationsByUser;
          console.log(this.conversations)
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }
    );
  }

  public navigateToConversation(_id: number): void {
    const currentUrl = this.router.url;
    const newUrl = `${currentUrl}/${_id}`;
    this.router.navigateByUrl(newUrl);
  }

  public deleteConversationByUser(conversationId: string): void {
    this.conversationService.deleteConversationByUser(conversationId)
    .subscribe(
      {
        next: (_resp: any) => {
          this.conversations = this.conversations.filter((conversation: Conversation) => conversation._id != conversationId);
          Swal.fire('Success', 'Conversación eliminada', 'success');
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }
    );
  }

}
