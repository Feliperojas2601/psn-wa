import { Injectable } from '@angular/core';
import { ApolloQueryResult, createHttpLink } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const urlInterface = environment.baseUrlInterface + '/graphql';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(
    private readonly apollo: Apollo,
  ) { }

  public getTwoF(): Observable<ApolloQueryResult<any>> {
    const GET_TWO_F = gql`
        query getTwoF{
          getTwoF{
            name 
          } 
        }
    `;
    return this.apollo.watchQuery({
      query: GET_TWO_F,
      context: {
        uri: urlInterface,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    }).valueChanges
  }
}
