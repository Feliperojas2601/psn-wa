import { Injectable } from '@angular/core';
import { ApolloQueryResult, createHttpLink } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const urlInterface = environment.baseUrlInterface + 'graphql';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(
    private readonly apollo: Apollo,
  ) { }

  public getProduct(): Observable<ApolloQueryResult<any>> {
    const GET_PRODUCT = gql`
        query getProduct{
          getProduct{
            name, 
            price
          } 
        }
    `;
    return this.apollo.watchQuery({
      query: GET_PRODUCT,
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
