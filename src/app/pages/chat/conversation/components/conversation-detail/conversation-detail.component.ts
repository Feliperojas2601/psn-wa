import { Component } from '@angular/core';
import { MessageService } from '../../../message/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../message/models/message.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.css']
})
export class ConversationDetailComponent {

  
  public messages!: Message[];
  public id!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ id }) => {
      this.id = id;  
    });
    this.messageService.getMessagesByConversation(this.id)
    .subscribe(
      {
        next: (resp: any) => {
          this.messages = resp.data.getMessagesByConversation;
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }
    );
    this.messageService.connectToChatSocket(this.id);
    this.messageService.getMessagesByConversationSocket().subscribe({
      next: (resp: any) => {
        const message: Message = resp; 
        const previousMessages: Message[] = this.messages;
        const newMessages: Message[] = [...previousMessages, message];
        this.messages = newMessages;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    }); 
    this.messageService.getMessagesDeletedByConversationSocket().subscribe({
      next: (resp: any) => {
        const message= resp.id;
        const newMessages = this.messages.filter(messageResp => messageResp.id !== message.id);
        this.messages = newMessages;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    
  }

}
