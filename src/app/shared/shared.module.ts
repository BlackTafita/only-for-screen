import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyForScreenDirective } from './directives/only-for-screen.directive';



@NgModule({
  declarations: [OnlyForScreenDirective],
  exports: [OnlyForScreenDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
