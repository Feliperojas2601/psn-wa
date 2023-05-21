import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { SocketChat } from '../../chat.module';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

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

  public connectToChatSocket(userId: number, conversationId: string) {
    this.socket.connect();
    const payload = {
      userId, 
      conversationId
    };
    this.socket.emit('JOIN_CONVERSATION', payload);
  }

  public createMessageSocket(content:string, conversationId: string, userId: number) {
    const payload = {
      content,
      userId,
      conversationId,
    };
    this.socket.emit('CREATE_MESSAGE', payload);
  }

  public deleteMessageSocket(messageId: string, userId: number, conversationId: string) {
    const payload = {
      messageId,
      userId, 
      conversationId,
    };
    this.socket.emit('DELETE_MESSAGE', payload);
  }

  public getMessagesByConversationSocket(): Observable<any> {
    return this.socket.fromEvent('CREATED_MESSAGE');
  }

  public getMessagesDeletedByConversationSocket(): Observable<any> {
    return this.socket.fromEvent('DELETED_MESSAGE');
  }

  public getRelationsToUser(id: number): Observable<ApolloQueryResult<any>> {
    const GETRELATIONSTOUSER = gql`
        query GetRelationsToUser($idD: Int) {
          getRelationsToUser(idD: $idD) {
            idO
            name
          }
        }
    `;

    return this.apollo.query({
      query: GETRELATIONSTOUSER,
      variables: {
        idD: id, 
      }
    });
  }

  public isBlockedUser(id: number): Observable<ApolloQueryResult<any>> {
    const ISBLOCKEDUSER = gql`
        query Query($idD: Int) {
          isBlockedUser(idD: $idD)
        }
    `;

    return this.apollo.query({
      query: ISBLOCKEDUSER,
      variables: {
        idD: id, 
      }
    });
  }

}
