import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowComponent } from './components/follow/follow.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FollowComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule
  ]
})
export class FollowModule { }
