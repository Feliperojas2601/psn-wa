import { Relationship } from '../../../../user/interfaces/relationship-interface';
import { MessageService } from '../../../message/services/message.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Message } from '../../../message/models/message.model';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.css']
})
export class ConversationDetailComponent {

  public subscriptionToDestroy: Subscription[] = [];
  public messages!: Message[];
  public membersId!: number[];

  public id!: string;
  public username!: string;
  public chatForm!: FormGroup; 
  public chatFormValue!: string; 
  public isBlockedUser!: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService, 
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.isBlockedUser = false;
  }
  
  ngOnInit(): void {
    let subscriptionActiveParams = this.activatedRoute.params.subscribe(({ id, username, membersId }) => {
      this.membersId = membersId.split(",").map(Number);
      this.username = username;
      this.id = id; 

      this.getMessagesByConversation();
      this.messageService.connectToChatSocket(this.authService.getUserId(), this.id);
      this.getMessagesDeletedByConversationSocket();
      this.getMessagesByConversationSocket();
      this.askBlockedUser();
    });
    this.subscriptionToDestroy.push(subscriptionActiveParams);

    this.chatForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  public getMessagesByConversation(): void {
    let subGetMessagesByConversation = this.messageService.getMessagesByConversation(this.id).subscribe({
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
    });
    this.subscriptionToDestroy.push(subGetMessagesByConversation);
  }

  public getMessagesByConversationSocket(): void {
    let subGetMessagesByConversationSocket = this.messageService.getMessagesByConversationSocket().subscribe({
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
    this.subscriptionToDestroy.push(subGetMessagesByConversationSocket);
  }

  public getMessagesDeletedByConversationSocket(): void {
    let subGetMessagesDeletedByConversationSocket = this.messageService.getMessagesDeletedByConversationSocket().subscribe({
      next: (resp: any) => {
        const message: Message = resp;
        const newMessages = this.messages.filter(messageResp => messageResp._id !== message._id);
        this.messages = newMessages;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subGetMessagesDeletedByConversationSocket);
  }

  public createMessage(): void {
    this.chatFormValue = this.chatForm.value.content as string;
    this.chatForm.patchValue({ content: '' });
    this.messageService.createMessageSocket(this.chatFormValue, this.id, this.authService.getUserId());
  }

  public askBlockedUser(): void {
    let idD = this.membersId[0];
    if(this.authService.getUserId() == idD){
      idD = this.membersId[1];
    }

    let subGetRelationsToUser = this.messageService.getRelationsToUser(idD).subscribe({
      next: (resp: any) => {
        let relations = resp.data.getRelationsToUser;
        let exists = relations.find((relation: Relationship) => relation.name == "BLOCK");
        if(exists){
          this.isBlockedUser = true;
          Swal.fire('Error', "User block", 'error');
        }else{
          let subGetRelationsToUser = this.messageService.isBlockedUser(idD).subscribe({
            next: (resp: any) => {
              if(resp.data.isBlockedUser == true){
                this.isBlockedUser = true;
                Swal.fire('Error', "User block", 'error');
              }
            },
            error: (err: any) => Swal.fire('Error', err.toString(), 'error')
          });
          this.subscriptionToDestroy.push(subGetRelationsToUser);
        }
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subGetRelationsToUser);

  }

  ngOnDestroy() {
    this.subscriptionToDestroy.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
