import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { SharedComponent } from './shared.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SharedComponent,
    CheckboxComponent,
    ButtonComponent
  ],
  exports: [
    CheckboxComponent,
    ButtonComponent
  ]
})
export class SharedModule { }
