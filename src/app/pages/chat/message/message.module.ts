import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDetailComponent } from './components/message-detail/message-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MessageDetailComponent
  ],
  imports: [
    CommonModule, 
    SharedModule
  ], 
  exports: [
    MessageDetailComponent
  ]
})
export class MessageModule { }
