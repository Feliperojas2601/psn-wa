import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, MutationResult, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(
    private readonly apollo: Apollo,
  ) { }

  public getFollow(): Observable<ApolloQueryResult<any>> {
    const GET_FOLLOWED_USERS = gql`
        query findAllFollowedUsers{
          findAllFollowedUsers{
            id
            name 
            lastName
          }        
        }      
    `;
    return this.apollo.watchQuery({
      query: GET_FOLLOWED_USERS,
    }).valueChanges
  }

  public getRequestFollowedUsers(): Observable<ApolloQueryResult<any>> {
    const GET_REQUEST_FOLLOWED_USERS = gql`
        query findAllFollowRequests{
          findAllFollowRequests{
            id
            name 
            lastName
          }        
        }      
    `;
    return this.apollo.watchQuery({
      query: GET_REQUEST_FOLLOWED_USERS,
    }).valueChanges
  }

  public getBlockedUsers(): Observable<ApolloQueryResult<any>> {
    const GET_BLOCKED_USERS = gql`
        query findAllBlockedUsers{
          findAllBlockedUsers{
            id
            name 
            lastName
          }        
        }      
    `;
    return this.apollo.watchQuery({
      query: GET_BLOCKED_USERS,
    }).valueChanges
  }

  public blockUser(id: number): Observable<MutationResult<any>> {
    const BLOCK_USER = gql`
        mutation blockUser($idD: Int!){
          blockUser(idD: $idD)
        }      
    `;
    return this.apollo.mutate({
      mutation: BLOCK_USER,
      variables: {
        idD: id
      }
    });
  }

  public unblockUser(id: number): Observable<MutationResult<any>> {
    const UNBLOCK_USER = gql`
        mutation unblockUser($idD: Int!){
          unblockUser(idD: $idD)
        }      
    `;
    return this.apollo.mutate({
      mutation: UNBLOCK_USER,
      variables: {
        idD: id
      }
    });
  }

  public unFollowUser(id: number): Observable<MutationResult<any>> {
    const UNFOLLOW_USER = gql`
        mutation unfollowUser($idD: Int!){
          unfollowUser(idD: $idD)
        }      
    `;
    return this.apollo.mutate({
      mutation: UNFOLLOW_USER,
      variables: {
        idD: id
      }
    });
  }

  public acceptFollowUser(id: number): Observable<MutationResult<any>> {
    const ACCEPT_FOLLOW_USER = gql`
        mutation acceptFollow($idD: Int!){
          acceptFollow(idD: $idD)
        }      
    `;
    return this.apollo.mutate({
      mutation: ACCEPT_FOLLOW_USER,
      variables: {
        idD: id
      }
    });
  }

  public rejectFollowUser(id: number): Observable<MutationResult<any>> {
    const REJECT_FOLLOW_USER = gql`
        mutation denyFollow($idD: Int!){
          denyFollow(idD: $idD)
        }      
    `;
    return this.apollo.mutate({
      mutation: REJECT_FOLLOW_USER,
      variables: {
        idD: id
      }
    });
  }
}
