import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserrsComponent } from './userrs.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchModule } from './search/search.module';
import { FriendsModule } from './friends/friends.module';

@NgModule({
  declarations: [
    UserrsComponent,
  ],
  imports: [
    CommonModule, 
    SearchModule, 
    FriendsModule, 
    SharedModule,
  ]
})
export class UserrsModule { }
