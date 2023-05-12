import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    { 
        path: 'psn', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: '', // redirige a /psn/chat
                redirectTo: 'chat',
                pathMatch: 'full'
            },
            { 
                path: 'chat', 
                loadChildren: () => import('./chat/chat-routing.module').then(m => m.ChatRoutingModule) 
            },
            { 
                path: 'notifications', 
                loadChildren: () => import('./notifications/notifications-routing.module').then(m => m.NotificationsRoutingModule) 
            },
            { 
                path: 'userrs', 
                loadChildren: () => import('./userrs/userrs-routing.module').then(m => m.UserrsRoutingModule) 
            },
            {
                path: 'profile',
                loadChildren: () => import('./user/user-routing.module').then(m => m.UserRoutingModule)
            }
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}