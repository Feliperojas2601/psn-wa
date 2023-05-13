import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserrsComponent } from './userrs.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchModule } from './search/search.module';
import { FollowModule } from './follow/follow.module';

@NgModule({
  declarations: [
    UserrsComponent,
  ],
  imports: [
    CommonModule, 
    SearchModule, 
    FollowModule, 
    SharedModule,
  ]
})
export class UserrsModule { }
