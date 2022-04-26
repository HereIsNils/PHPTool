import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgModule } from "@angular/core";
import { CoreModule } from "src/app/core/core.module";
import { PhpToolComponent } from './php-tool.component';
import { DialogLoginComponent } from './Dialogs/dialog-login/dialog-login.component';
import { DialogAddUserComponent } from './Dialogs/dialog-add-user/dialog-add-user.component';
import { UsergroupViewComponent } from './usergroup-view/usergroup-view.component';
import { DialogCreateUsergroupComponent } from './Dialogs/dialog-create-usergroup/dialog-create-usergroup.component';
import { UserListViewComponent } from './views/user-list-view/user-list-view.component';
import { TableViewComponent } from './views/user-list-view/table-view/table-view.component';

@NgModule({
    declarations: [
    PhpToolComponent,
    DialogLoginComponent,
    DialogAddUserComponent,
    UsergroupViewComponent,
    DialogCreateUsergroupComponent,
    UserListViewComponent,
    TableViewComponent,
  ],
    imports: [
        CoreModule,
        DragDropModule,
    ]
})
export class PHPToolModule { }