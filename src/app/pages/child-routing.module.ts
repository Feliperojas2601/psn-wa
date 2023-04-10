import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './posts/posts.component';
import { ChatComponent } from './chat/chat.component';
import { PagesComponent } from './pages.component';


const childRoutes: Routes = [
  { path: 'posts', component: PostsComponent, data: { titulo: 'Posts' }},
  { path: 'chat', component: ChatComponent, data: { titulo: 'Busquedas' }},
 ]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutingModule { }