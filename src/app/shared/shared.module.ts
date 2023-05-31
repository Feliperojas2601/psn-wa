import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { PrimengModule } from './primeng/primeng.module';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    NotfoundComponent,
    MenubarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule, 
    PrimengModule
  ], 
  exports: [ 
    CommonModule, 
    PrimengModule,
    MenubarComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
