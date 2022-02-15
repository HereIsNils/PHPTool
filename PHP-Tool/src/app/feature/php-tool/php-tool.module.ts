import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgModule } from "@angular/core";
import { CoreModule } from "src/app/core/core.module";
import { PhpToolComponent } from './php-tool.component';

@NgModule({
    declarations: [
    PhpToolComponent,
  ],
    imports: [
        CoreModule,
        DragDropModule,
    ]
})
export class PHPToolModule { }