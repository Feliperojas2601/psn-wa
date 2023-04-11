import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PrimengModule } from './primeng/primeng.module';
import { MenubarComponent } from './components/menubar/menubar.component';



@NgModule({
  declarations: [
    NotfoundComponent,
    MenubarComponent
  ],
  imports: [
    CommonModule, 
    PrimengModule
  ], 
  exports: [ 
    CommonModule, 
    PrimengModule,
    MenubarComponent,
  ]
})
export class SharedModule { }
