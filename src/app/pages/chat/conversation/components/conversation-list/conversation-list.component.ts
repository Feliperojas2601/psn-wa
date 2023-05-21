import { ConversationService } from '../../services/conversation.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
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
    this.getConversationsByUser();
  }

  public getConversationsByUser(): void {
    let subGetConversationsByUser = this.conversationService.getConversationsByUser().subscribe({
      next: (resp: any) => {
        this.conversations = resp.data.getConversationsByUser;
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subGetConversationsByUser);
  }

  public deleteConversationByUser(conversationId: string): void {
    let subDeleteConversationByUser = this.conversationService.deleteConversationByUser(conversationId).subscribe({
      next: (_resp: any) => {
        this.conversations = this.conversations.filter((conversation: Conversation) => conversation._id != conversationId);
        Swal.fire('Success', 'Conversación eliminada', 'success');
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subDeleteConversationByUser);
  }

  public navigateToConversation(id: number, username: string, membersId: number[]): void {
    const currentUrl = this.router.url;
    const newUrl = `${currentUrl}/${id}/${username}/${membersId}`;
    this.router.navigateByUrl(newUrl);
  }

  ngOnDestroy() {
    this.subscriptionToDestroy.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
