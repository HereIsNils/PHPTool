import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PHPToolModule } from './php-tool/php-tool.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PHPToolModule,
  ],
  exports: [
    PHPToolModule,
  ]
})
export class FeatureModule { }