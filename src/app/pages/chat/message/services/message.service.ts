import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { SocketChat } from 'src/app/pages/pages.module';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private readonly apollo: Apollo,
    private readonly socket: SocketChat
  ) { }

  public getMessagesByConversation(conversationId: string): Observable<ApolloQueryResult<any>> {
    const GET_MESSAGES_BY_CONVERSATION = gql`
        query getMessagesByConversation(
          $conversationId: String!
        ){
          getMessagesByConversation(
            conversationId: $conversationId
          ) {
              _id, 
              createDate, 
              content, 
              updateDate, 
              conversationId, 
              active, 
              userId
          }
        }
    `;
    return this.apollo.watchQuery({
      query: GET_MESSAGES_BY_CONVERSATION,
      variables: {
        conversationId
      }
    }).valueChanges
  }

  public connectToChatSocket(conversationId: string) {
    this.socket.connect();
    this.socket.emit('JOIN_CONVERSATION', {conversationId});
  }

  public sendMessageSocket(message: Message) {
    this.socket.emit('CREATE_MESSAGE', message);
  }

  public deleteMessageSocket(messageId: string) {
    this.socket.emit('DELETE_MESSAGE', {messageId});
  }

  public getMessagesByConversationSocket(): Observable<any> {
    return this.socket.fromEvent('CREATED_MESSAGE');
  }

  public getMessagesDeletedByConversationSocket(): Observable<any> {
    return this.socket.fromEvent('DELETED_MESSAGE');
  }

}
