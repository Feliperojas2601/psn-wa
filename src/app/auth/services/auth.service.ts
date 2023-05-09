import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { VerifyTokenForm } from '../interfaces/verify-token-form.interface';
import { ResetPasswordConfirmedForm } from '../interfaces/reset-password-confirmed-form.interface';
import { JwtService } from './jwt.service';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userId!: number; 

  constructor(
    private readonly apollo: Apollo,
    private readonly jwtService: JwtService,
  ) {}

  public registerUser(registerForm: RegisterForm): Observable<MutationResult> {
    const REGISTER_USER = gql`
        mutation registerUser(
          $email: String!,
          $password: String!,
          $name: String!,
          $lastName: String!,
          $phoneNumber: String!,
          $notificationsEnable: Boolean!, 
          $profileType: String!
        ) {
          registerUser(user: {
            email: $email,
            password: $password,
            name: $name,
            lastName: $lastName,
            phoneNumber: $phoneNumber,
            notificationsEnable: $notificationsEnable,
            profileType: $profileType
          }) 
        }
    `;
    return this.apollo.mutate({
      mutation: REGISTER_USER,
      variables: {
        email: registerForm.email,
        password: registerForm.password,
        name: registerForm.name,
        lastName: registerForm.surname,
        phoneNumber: registerForm.phone,
        notificationsEnable: true,
        profileType: "PUBLIC"
      }
    });
  }

  public loginUser(loginForm: LoginForm): Observable<MutationResult> {
    const LOGIN_USER = gql`
        mutation login(
          $email: String!
          $password: String!
        ){
          login(
            credentials: {
              email: $email,
              password: $password
            }
          ) {
            access_token
            refresh_token
          }
        }
    `;
    return this.apollo.mutate({
      mutation: LOGIN_USER,
      variables: {
        email: loginForm.email,
        password: loginForm.password
      }
    }).pipe(
      tap(
        ({data}: any) => {
          this.jwtService.setSessionStorage(data.login.access_token, data.login.refresh_token);
          this.userId = this.jwtService.decodeJwtUserId(data.login.access_token);
        }
      ),
    );
  }

  public verifyToken(verifyTokenForm: VerifyTokenForm): Observable<MutationResult> {
    const VERIFY_TOKEN = gql`
        mutation verifyAccount(
          $id: Int!
          $code: String!
        ){
          verifyAccount(
            id: $id,
            code: $code
          )
        }
    `;
    return this.apollo.mutate({
      mutation: VERIFY_TOKEN,
      variables: {
          id: verifyTokenForm.id,
          code: verifyTokenForm.token
      }
    })
  }

  public requestResetPassword(email: String): Observable<ApolloQueryResult<any>> {
    const REQUEST_RESET_PASSWORD = gql`
        query sendEmailToChangePassword(
          $email: String!
        ){
          sendEmailToChangePassword(
            email: $email
          )
        }
    `;
    return this.apollo.watchQuery({
      query: REQUEST_RESET_PASSWORD,
      variables: {
        email
      }
    }).valueChanges
  }

  public resetPassword(resetPasswordConfirmedForm: ResetPasswordConfirmedForm): Observable<MutationResult> {
    const RESET_PASSWORD = gql`
        mutation changePassword(
          $id: Int!,
          $code: String!,
          $newPassword: String!
        ) {
          changePassword(
            id: $id,
            code: $code, 
            newPassword: $newPassword
          )
        }
    `;
    return this.apollo.mutate({
      mutation: RESET_PASSWORD,
      variables: {
        id: resetPasswordConfirmedForm.id,
        code: resetPasswordConfirmedForm.code,
        newPassword: resetPasswordConfirmedForm.newPassword,
      }
    })
  }

  public setSessionStorage(jwtpsn: string, jwtrefreshpsn: string): void {
    this.jwtService.setSessionStorage(jwtpsn, jwtrefreshpsn);
  }

  public async logout(): Promise<void> {
    await this.apollo.client.resetStore();
    this.jwtService.removeSessionStorage();
  }

  public refreshToken(refreshToken: string): Observable<MutationResult> {
    const REFRESH_TOKEN = gql`
      mutation refreshToken {
        refreshToken {
          access_token
          refresh_token
        } 
      }
    `;
    
    const headers = {
      Authorization: `Bearer ${refreshToken}`
    };
  
    return this.apollo.mutate({
      mutation: REFRESH_TOKEN,
      context: {
        headers: headers
      }
    }).pipe(
      tap(({data}: any) => {
        this.jwtService.setSessionStorage(data.refreshToken.access_token, data.refreshToken.refresh_token);
        this.userId = this.jwtService.decodeJwtUserId(data.refreshToken.access_token);
      })
    );
  }  

  public isUserAuthenticated(): Observable<boolean> {
    // Validate session storage access token is valid according to expiration date
    const token = this.jwtService.getToken();
    const refreshToken = this.jwtService.getRefreshToken();
  
    if (!token || token == '') {
      return of(false);
    }
  
    // If the token is not expired, return true
    /*if (!this.jwtService.isTokenExpired(token)) {
      return of(true);
    }*/
  
    // If the token is expired, try to refresh it
    return this.refreshToken(refreshToken).pipe(
      map((_resp: any) => {
        return true;
      }),
      catchError((_err: any) => {
        return of(false);
      })

    );
  }
  

  public getUserId(): number {
    return this.userId;
  }
}
