import { AuthService } from 'src/app/auth/services/auth.service';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})

export class MessageDetailComponent {
  @Input() message!: Message;
  @Input() isUser!: boolean;

  constructor(
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
  ) {}

  public deleteMessage(): void {
    this.messageService.deleteMessageSocket(this.message._id, this.authService.getUserId() ,this.message.conversationId);
  }
}
