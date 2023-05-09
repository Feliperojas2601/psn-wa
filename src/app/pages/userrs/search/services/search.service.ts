import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, MutationResult, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private readonly apollo: Apollo,
  ) { }

  public getAllSearchedUsers(): Observable<ApolloQueryResult<any>> {
    const GET_ALL_SEARCHED_USERS = gql`
        query findAllSearchedUsers{
          findAllSearchedUsers{
            Values{
              Id
              ElementId
              Labels
              Props {
                id
              }
            }
            Keys
          }        
        }
    `;
    return this.apollo.watchQuery({
      query: GET_ALL_SEARCHED_USERS,
    }).valueChanges
  }

  public getAllSuggestedUsers(): Observable<ApolloQueryResult<any>> {
    const GET_ALL_SUGGESTED_USERS = gql`
        query findAllSuggestedFriends{
          findAllSuggestedFriends{
            Values{
              Id
              ElementId
              Labels
              Props {
                id
              }
            }
            Keys
          }                
        }
    `;
    return this.apollo.watchQuery({
      query: GET_ALL_SUGGESTED_USERS,
    }).valueChanges
  }

  public deleteRecentSearchedUsers(): Observable<MutationResult<any>> {
    const DELETE_RECENT_SEARCHED_USERS = gql`
        mutation deleteRecentSearchedUsers {
          deleteRecentSearchedUsers
        }
    `;
    return this.apollo.mutate({
      mutation: DELETE_RECENT_SEARCHED_USERS,
    });
  }

  public followUser(userId: number): Observable<MutationResult<any>> {
    const FOLLOW_USER = gql`
        mutation followUser($idD: Int!) {
          followUser(idD: $idD)
        }
    `;
    return this.apollo.mutate({
      mutation: FOLLOW_USER,
      variables: {
        idD: userId,
      }
    });
  }

  public searchUser(searchedParam: string): Observable<MutationResult<any>> {
    const SEARCH_USER = gql`
        mutation searchUser ($idD: Int!) {
          searchUser(idD: $idD)    
        }   
    `;
    return this.apollo.mutate({
      mutation: SEARCH_USER,
      variables: {
        idD: 4,
      }
    });
  }
}
