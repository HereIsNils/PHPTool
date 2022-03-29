import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgModule } from "@angular/core";
import { CoreModule } from "src/app/core/core.module";
import { PhpToolComponent } from './php-tool.component';
import { AccManagementViewComponent } from './acc-management-view/acc-management-view.component';
import { DialogLoginComponent } from './Dialogs/dialog-login/dialog-login.component';
import { DialogAddUserComponent } from './Dialogs/dialog-add-user/dialog-add-user.component';
import { TestuserTableComponent } from './acc-management-view/testuser-table/testuser-table.component';
import { DevuserTableComponent } from './acc-management-view/devuser-table/devuser-table.component';
import { DialogSettingsComponent } from './Dialogs/dialog-settings/dialog-settings.component';
import { UsergroupViewComponent } from './usergroup-view/usergroup-view.component';
import { DialogCreateUsergroupComponent } from './Dialogs/dialog-create-usergroup/dialog-create-usergroup.component';
import { UsergroupSettingsViewComponent } from './views/usergroup-settings-view/usergroup-settings-view.component';
import { UserListViewComponent } from './views/user-list-view/user-list-view.component';

@NgModule({
    declarations: [
    PhpToolComponent,
    AccManagementViewComponent,
    DialogLoginComponent,
    DialogAddUserComponent,
    TestuserTableComponent,
    DevuserTableComponent,
    DialogSettingsComponent,
    UsergroupViewComponent,
    DialogCreateUsergroupComponent,
    UsergroupSettingsViewComponent,
    UserListViewComponent,
  ],
    imports: [
        CoreModule,
        DragDropModule,
    ]
})
export class PHPToolModule { }