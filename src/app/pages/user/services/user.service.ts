import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, MutationResult, gql } from 'apollo-angular';
import { ProfileForm } from '../interfaces/profile-form.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly apollo: Apollo,
  ) { }

  public findUserById(id: number): Observable<MutationResult> {
    const FINDUSERBYID = gql`
      query FindUserById($id: Int!) {
        findUserById(id: $id) {
          id
          role
          email
          name
          lastName
          phoneNumber
          notificationsEnable
          profileUpdateDate
          profileType
          enabled
          accountNonLocked
        }
      }
    `;
    
    return this.apollo.query({
      query: FINDUSERBYID,
      variables: {
        id: id,
      }
    });
  }

  public editUserById(id: number, user: ProfileForm): Observable<MutationResult> {
    const userInput = {...user};
    delete userInput['role' as keyof ProfileForm];
    delete userInput['profileUpdateDate' as keyof ProfileForm];
    
    const EDITUSERBYID = gql`
        mutation EditUserById($id: Int!, $user: UserInput!) {
          editUserById(id: $id, user: $user)
        }
    `;

    return this.apollo.mutate({
      mutation: EDITUSERBYID,
      variables: {
        id: id,
        user: userInput,
      }
    });
  }

  public getProfilePicture(ids: number[]): Observable<MutationResult> {
    const GETPROFILEPICTURE = gql`
        query Query($ids: [Int!]!) {
          getProfilePicture(ids: $ids)
        }
    `;

    return this.apollo.query({
      query: GETPROFILEPICTURE,
      variables: {
        ids: ids,
      }
    });
  }

  public changeProfilePicture(): Observable<MutationResult> {
    const CHANGEPROFILEPICTURE = gql`
        mutation Mutation {
          changeProfilePicture
        }
    `;

    return this.apollo.mutate({
      mutation: CHANGEPROFILEPICTURE,
    });
  }

  public getRelationsToUser(id: number): Observable<MutationResult> {
    const GETRELATIONSTOUSER = gql`
        query GetRelationsToUser($idD: Int) {
          getRelationsToUser(idD: $idD) {
            idO
            name
          }
        }
    `;

    return this.apollo.mutate({
      mutation: GETRELATIONSTOUSER,
      variables: {
        idD: id, 
      }
    });
  }

}
