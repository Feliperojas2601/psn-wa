import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  public isUserAuthenticated(): boolean {
    return true;
  }

  public getUserId(): string {
    return '';
  }
}
