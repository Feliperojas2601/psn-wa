import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PostsModule } from './posts/posts.module';
import { UserrsModule } from './userrs/userrs.module';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule, 
    ChatModule, 
    NotificationsModule, 
    PostsModule, 
    UserModule,
    UserrsModule
  ]
})
export class PagesModule { }
