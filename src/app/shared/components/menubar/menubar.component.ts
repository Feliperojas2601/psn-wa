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
      label: 'Publicaciones',
      icon: 'pi pi-file',
      routerLink: ['/psn/posts']
    }, 
    {
      label: 'Chat',
      icon: 'pi pi-comments',
      routerLink: ['/psn/chat']
    }, 
    {
      label: 'Búsqueda',
      icon: 'pi pi-search',
      routerLink: ['/psn/userrs/search']
    }, 
    {
      label: 'Usuario',
      icon: 'pi pi-user',
      routerLink: ['/psn/profile']
    }, 
    {
      label: 'Amigos',
      icon: 'pi pi-users',
      routerLink: ['/psn/userrs/friends']
    },
    {
      label: 'Salir',
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
