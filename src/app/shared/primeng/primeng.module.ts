import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    ButtonModule,
    CardModule,
    DividerModule,
    InputTextModule,
  ], 
  exports: [
    CommonModule,
    ButtonModule, 
    CardModule,
    DividerModule,
    InputTextModule,
  ]
})
export class PrimengModule { }
