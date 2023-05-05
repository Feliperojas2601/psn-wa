import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  public setSessionStorage(jwtpsn: string, jwtrefreshpsn: string): void {
    sessionStorage.setItem('jwtpsn', jwtpsn);
    sessionStorage.setItem('jwtrefreshpsn', jwtrefreshpsn);
  }

  public removeSessionStorage(): void {
    sessionStorage.removeItem('jwtpsn');
    sessionStorage.removeItem('jwtrefreshpsn');
  }

  public getToken(): string {
    return sessionStorage.getItem('jwtpsn') || '';
  }

  public getRefreshToken(): string {
    return sessionStorage.getItem('jwtrefreshpsn') || '';
  }

  public decodeJwtUserId(jwt: string): number {
    let token: any = {};
    token.raw = jwt;
    token.header = JSON.parse(window.atob(jwt.split(".")[0]));
    token.payload = JSON.parse(window.atob(jwt.split(".")[1]));
    const userInfo = token.payload.sub.split(",");
    const id = userInfo[1]; 
    return id; 
  }

  public isTokenExpired(jwt: string): boolean {
    return false; 
  }
}
