import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  public setLocalStorage(jwtpsn: string, jwtrefreshpsn: string): void {
    localStorage.setItem('jwtpsn', jwtpsn);
    localStorage.setItem('jwtrefreshpsn', jwtrefreshpsn);
  }

  public removeLocalStorage(): void {
    localStorage.removeItem('jwtpsn');
    localStorage.removeItem('jwtrefreshpsn');
  }

  public getToken(): string {
    return localStorage.getItem('jwtpsn') || '';
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
}
