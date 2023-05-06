import { Component } from '@angular/core';
import { MessageService } from '../../../message/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../../message/models/message.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.css']
})
export class ConversationDetailComponent {

  
  public messages!: Message[];
  public id!: string;
  public username!: string;
  public chatForm!: FormGroup; 
  public chatFormValue!: string; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: MessageService, 
    private authService: AuthService,
  ) {}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ id, username }) => {
      this.id = id;  
      this.username = username;
    });
    this.chatForm = this.fb.group({
      content: ['', Validators.required],
    });
    this.messageService.getMessagesByConversation(this.id)
    .subscribe(
      {
        next: (resp: any) => {
          this.messages = resp.data.getMessagesByConversation;
          this.messages.forEach((message: Message, index: number) => {
            const updatedMessage = new Message(
              message._id,
              message.content,
              message.userId,
              message.conversationId,
              message.createDate,
              message.updateDate,
              message.active, 
              message.userId == this.authService.getUserId(),
              this.username,
            ); 
            const updatedMessages = [...this.messages];
            updatedMessages[index] = updatedMessage;
            this.messages = updatedMessages;
          });
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }
    );
    this.messageService.connectToChatSocket(this.authService.getUserId(), this.id);
    this.messageService.getMessagesByConversationSocket().subscribe({
      next: (resp: any) => {
        const message: Message = resp; 
        const updatedMessage = new Message(
          message._id,
          message.content,
          message.userId,
          message.conversationId,
          message.createDate,
          message.updateDate,
          message.active, 
          message.userId == this.authService.getUserId(),
          this.username,
        ); 
        const previousMessages: Message[] = this.messages;
        const newMessages: Message[] = [...previousMessages, updatedMessage];
        this.messages = newMessages;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    }); 
    this.messageService.getMessagesDeletedByConversationSocket().subscribe({
      next: (resp: any) => {
        const message: Message = resp;
        const newMessages = this.messages.filter(messageResp => messageResp._id !== message._id);
        this.messages = newMessages;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
  }

  public createMessage(): void {
    this.chatFormValue = this.chatForm.value.content as string;
    this.chatForm.patchValue({ content: '' });
    this.messageService.createMessageSocket(this.chatFormValue, this.id, this.authService.getUserId());
  }

}
