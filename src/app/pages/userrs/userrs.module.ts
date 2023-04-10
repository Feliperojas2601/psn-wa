import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserrsComponent } from './userrs.component';
import { BlockingModule } from './blocking/blocking.module';
import { FollowUpModule } from './follow-up/follow-up.module';
import { SearchModule } from './search/search.module';



@NgModule({
  declarations: [
    UserrsComponent,
  ],
  imports: [
    CommonModule, 
    BlockingModule,
    FollowUpModule,
    SearchModule, 
  ]
})
export class UserrsModule { }
