import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { subscribe } from 'graphql';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class MenubarComponent {
  public items: MenuItem[] = [
    {
      label: 'Posts',
      icon: 'pi pi-file',
      routerLink: ['/psn/posts']
    }, 
    {
      label: 'Chat',
      icon: 'pi pi-comments',
      routerLink: ['/psn/chat']
    }, 
    {
      label: 'Search',
      icon: 'pi pi-search',
      routerLink: ['/psn/search']
    }, 
    {
      label: 'User',
      icon: 'pi pi-user',
      routerLink: ['/psn/user']
    }, 
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ]; 

  constructor(private authService: AuthService, private router: Router) {}

  public logout(): void {
    this.authService.logout().then(
      () => {
        this.router.navigate(['/login']);
      }
    );
  }
}
