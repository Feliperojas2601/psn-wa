import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, MutationResult, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(
    private readonly apollo: Apollo,
  ) { }

  public createConversation(userId: number) : Observable<MutationResult> {
    const CREATE_CONVERSATION = gql`
        mutation createConversation($memberToId: Int!) {
          createConversation(memberToId: $memberToId) {
            _id,
            createDate,
            updateDate,
            membersId
          }
        }
    `;
    return this.apollo.mutate({
      mutation: CREATE_CONVERSATION,
      variables: {
        memberToId: userId
      }
    });
  }

  public getConversationsByUser(): Observable<ApolloQueryResult<any>> {
    const GET_CONVERSATIONS_BY_USER = gql`
        query getConversationsByUser{
          getConversationsByUser {
            _id, 
            createDate, 
            membersId, 
            updateDate, 
            memberToName
          }
        }
    `;
    return this.apollo.watchQuery({
      query: GET_CONVERSATIONS_BY_USER,
    }).valueChanges
  }

  public deleteConversationByUser(conversationId: string): Observable<MutationResult> {
    const DELETE_CONVERSATION_BY_USER = gql`
        mutation deleteConversationByUser($conversationId: String!) {
          deleteConversationByUser(conversationId: $conversationId) {
            _id, 
            createDate, 
            updateDate, 
            membersId
          }      
        }
    `;
    return this.apollo.mutate({
      mutation: DELETE_CONVERSATION_BY_USER,
      variables: {
        conversationId
      }
    });
  }
  
}
