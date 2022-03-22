import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgModule } from "@angular/core";
import { CoreModule } from "src/app/core/core.module";
import { PhpToolComponent } from './php-tool.component';
import { UpdateManagementViewComponent } from './update-management-view/update-management-view.component';
import { AccManagementViewComponent } from './acc-management-view/acc-management-view.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { TestuserTableComponent } from './acc-management-view/testuser-table/testuser-table.component';
import { DevuserTableComponent } from './acc-management-view/devuser-table/devuser-table.component';

@NgModule({
    declarations: [
    PhpToolComponent,
    UpdateManagementViewComponent,
    AccManagementViewComponent,
    DialogLoginComponent,
    DialogAddUserComponent,
    TestuserTableComponent,
    DevuserTableComponent,
  ],
    imports: [
        CoreModule,
        DragDropModule,
    ]
})
export class PHPToolModule { }