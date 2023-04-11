import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
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
  ]
}
