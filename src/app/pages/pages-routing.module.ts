import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth//guards/auth.guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    { 
        path: 'psn', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        canLoad: [ AuthGuard ],
        children: [
            { 
                path: 'chat', 
                loadChildren: () => import('./chat/chat-routing.module').then(m => m.ChatRoutingModule) 
            },
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}