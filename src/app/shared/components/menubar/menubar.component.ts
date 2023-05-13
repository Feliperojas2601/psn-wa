import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarService } from '../../services/menubar.service';
import { Subscription } from 'rxjs';

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
      routerLink: ['/psn/profile', this.authService.getUserId()]
    }, 
    {
      label: 'Seguidos',
      icon: 'pi pi-users',
      routerLink: ['/psn/userrs/follow']
    },
    {
      label: 'Salir',
      icon: 'pi pi-sign-out',
      command: () => this.logout()
    }
  ]; 

  public subscription: Subscription;
  public bellColor!: string;

  constructor(private authService: AuthService, private router: Router, private menubarService: MenubarService) {
    this.subscription = menubarService.color$.subscribe(
      color => (this.bellColor = color)
    );
  }

  public changeBellColor(): void {
    this.bellColor = "white";
  }

  public logout(): void {
    this.authService.logout().then(() => {
        this.router.navigate(['/login']);
      }
    );
  }
}
