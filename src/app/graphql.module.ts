import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context'
import { JwtService } from './auth/services/jwt.service'
import { environment } from '../environments/environment'

const uri = environment.baseUrl;

export function createApollo(httpLink: HttpLink, jwtService: JwtService): ApolloClientOptions<any> {
  const basic = setContext(() => ({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  }));
  const auth = setContext(() => {
    const token = jwtService.getToken();
    if (token === null) {
      return {};
    }
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  })
  const link = ApolloLink.from([
    basic,
    auth,
    httpLink.create({ uri })
  ])
  return {
    link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'none',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'none',
      },
      mutate: {
        errorPolicy: 'none',
      }
    },
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, JwtService],
    },
  ],
})
export class GraphQLModule {
}
