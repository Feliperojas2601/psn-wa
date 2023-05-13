import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenubarService {
  
  private colorSubject = new Subject<string>();
  color$ = this.colorSubject.asObservable();

  toggleBellColor(color: string) {
    this.colorSubject.next(color);
  }
}
