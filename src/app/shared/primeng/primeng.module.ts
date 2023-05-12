import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { MenubarModule } from 'primeng/menubar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    ButtonModule,
    CardModule,
    DividerModule,
    InputTextModule,
    DataViewModule, 
    MenubarModule,
    AutoCompleteModule,
    DropdownModule,
    FileUploadModule,
    DialogModule,
  ], 
  exports: [
    CommonModule,
    ButtonModule, 
    CardModule,
    DividerModule,
    InputTextModule,
    DataViewModule,
    MenubarModule, 
    AutoCompleteModule,
    DropdownModule,
    FileUploadModule,
    DialogModule,
  ]
})
export class PrimengModule { }
