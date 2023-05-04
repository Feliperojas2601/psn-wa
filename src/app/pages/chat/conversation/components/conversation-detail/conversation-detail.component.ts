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
    private messsageService: MessageService
  ) {}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ id }) => {
      this.id = id;  
    });
    this.messsageService.getMessagesByConversation(this.id)
    .subscribe(
      {
        next: (resp: any) => {
          this.messages = resp.data.getMessagesByConversation;
        }, 
        error: (err: any) => Swal.fire('Error', err.error.msg, 'error')
      }
    );
  }

}
