import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './components/friends/friends.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    FriendsComponent
  ],
  imports: [
    CommonModule, 
    SharedModule
  ]
})
export class FriendsModule { }
