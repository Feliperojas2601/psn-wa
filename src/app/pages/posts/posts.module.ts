import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { CreatorActionsModule } from './creator-actions/creator-actions.module';
import { UserActionsModule } from './user-actions/user-actions.module';

@NgModule({
  declarations: [
    PostsComponent
  ],
  imports: [
    CommonModule, 
    CreatorActionsModule, 
    UserActionsModule
  ]
})
export class PostsModule { }
