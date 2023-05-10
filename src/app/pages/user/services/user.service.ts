import { Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly apollo: Apollo,
  ) { }

  

}
