import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private readonly apollo: Apollo,
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

}
