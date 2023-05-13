import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
import { ConversationService } from '../../services/conversation.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class ConversationListComponent implements OnInit {

  public subscriptionToDestroy: Subscription[] = [];
  public conversations!: Conversation[];

  constructor(
    private conversationService: ConversationService,
    private router: Router,
  ) {}
  
  ngOnInit(): void {
    let subscriptionConversationByUser = this.conversationService.getConversationsByUser().subscribe(
      {
        next: (resp: any) => {
          this.conversations = resp.data.getConversationsByUser;
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }
    );

    this.subscriptionToDestroy.push(subscriptionConversationByUser);
  }

  public navigateToConversation(id: number, username: string): void {
    const currentUrl = this.router.url;
    const newUrl = `${currentUrl}/${id}/${username}`;
    this.router.navigateByUrl(newUrl);
  }

  public deleteConversationByUser(conversationId: string): void {
    let subscriptionDeleteConversation = this.conversationService.deleteConversationByUser(conversationId).subscribe(
      {
        next: (_resp: any) => {
          this.conversations = this.conversations.filter((conversation: Conversation) => conversation._id != conversationId);
          Swal.fire('Success', 'Conversación eliminada', 'success');
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }
    );

    this.subscriptionToDestroy.push(subscriptionDeleteConversation);
  }

  ngOnDestroy() {
    this.subscriptionToDestroy.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
