import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
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
          $profilePicture: String!,
          $profileType: String!
        ) {
          registerUser(user: {
            email: $email,
            password: $password,
            name: $name,
            lastName: $lastName,
            phoneNumber: $phoneNumber,
            notificationsEnable: $notificationsEnable,
            profilePicture: $profilePicture,
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
        profilePicture: "",
        profileType: "PUBLIC"
      }
    });
  }

  public loginUser(loginForm: LoginForm): Observable<MutationResult> {
    const LOGIN_USER = gql`
        mutation login(
          $email: String
          $password: String
        ){
          login(
            credentials: {
              email: $email,
              password: $password
            }
          ) {
            id
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
    });
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
          $password: String!
        ) {
          resetPassword(
            id: $id,
            code: $code, 
            password: $password
          )
        }
    `;
    return this.apollo.mutate({
      mutation: RESET_PASSWORD,
      variables: {
        id: resetPasswordConfirmedForm.id,
        token: resetPasswordConfirmedForm.token,
        password: resetPasswordConfirmedForm.password,
      }
    })
  }

  public refreshToken(): Observable<boolean> {
    const REFRESH_TOKEN = gql`
        mutation refreshToken {
          refreshToken{
            access_token
            refresh_token
          } 
        }
    `;
    return this.apollo.mutate({
      mutation: REFRESH_TOKEN
    }).pipe(
      map( (resp: any) => {
        this.userId = this.jwtService.decodeJwtUserId(resp.access_token); 
        this.setLocalStorage(resp.access_token, resp.refresh_token);
        return true;
      }),
      catchError( (_error: any) => of(false) )
    );
  }

  public setLocalStorage(jwtpsn: string, jwtrefreshpsn: string): void {
    this.jwtService.setLocalStorage(jwtpsn, jwtrefreshpsn);
  }

  public async logout(): Promise<void> {
    this.jwtService.removeLocalStorage();
    await this.apollo.client.resetStore();
  }

  public isUserAuthenticated(): boolean {
    let response: boolean = false; 
    this.refreshToken().subscribe(
      {
        next: (resp: boolean) => response = resp, 
        error: (_err: any) => response = false 
      }
    )
    return response;
  }

  public getUserId(): number {
    return this.userId;
  }
}
