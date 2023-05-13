import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { SocketNotification } from '../notifications.module';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private readonly apollo: Apollo,
    private readonly socket: SocketNotification,
  ) { }

  public getNotificationsByUser(): Observable<ApolloQueryResult<any>> {
    const GET_NOTIFICATIONS_BY_USER = gql`
        query getNotificationsByUser{
          getNotificationsByUser {
            actorId, 
            content, 
            createDate, 
            notifierId, 
            title, 
            type  
          }
        }
    `;
    return this.apollo.watchQuery({
      query: GET_NOTIFICATIONS_BY_USER,
    }).valueChanges
  }

  public connectToNotificationSocket(userId: number) {
    this.socket.connect();
    this.socket.emit('JOIN_CONVERSATION', {userId});
  }

  public getNotificationsByUserSocket(): Observable<any> {
    return this.socket.fromEvent('CREATED_NOTIFICATION');
  }
}
