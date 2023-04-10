import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';
import { PrimengModule } from './primeng/primeng.module';



@NgModule({
  declarations: [
    NotfoundComponent
  ],
  imports: [
    CommonModule, 
    PrimengModule
  ], 
  exports: [ 
    CommonModule, 
    PrimengModule,
  ]
})
export class SharedModule { }
