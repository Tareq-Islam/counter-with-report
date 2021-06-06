import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [CoreComponent]
})
export class CoreModule { }
