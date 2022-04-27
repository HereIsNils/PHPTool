import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SingleAccount, SingleAccountProps, SingleUser, UserGroup, UserGroupProps } from 'src/app/core/models/php-tool';
import { PhpToolService } from 'src/app/core/services/php-tool.service';
import { DialogCreateUsergroupComponent } from './Dialogs/dialog-create-usergroup/dialog-create-usergroup.component';
import { DialogLoginComponent } from './Dialogs/dialog-login/dialog-login.component';

@Component({
  selector: 'app-php-tool',
  templateUrl: './php-tool.component.html',
  styleUrls: ['./php-tool.component.scss']
})
export class PhpToolComponent implements OnInit {

  userGroups?: UserGroup[];
  accounts?: SingleAccount[];
  private dataChangeSubscription: Subscription;


  constructor(private phpToolService: PhpToolService, public dialog: MatDialog) {
    this.dataChangeSubscription = phpToolService.onDataChaged().subscribe(() => this.refreshData());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<
      DialogLoginComponent,
      SingleAccountProps | undefined,
      SingleAccountProps | undefined
    >(DialogLoginComponent, {
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) return;
      this.phpToolService.createAccount(result);
    });
  }

  createUserGroup(): void {
    const dialogRef = this.dialog.open<DialogCreateUsergroupComponent, UserGroupProps>(DialogCreateUsergroupComponent, { data: undefined });

    dialogRef.afterClosed().subscribe((result: UserGroupProps) => {
      if (result === undefined) return;
      this.phpToolService.createUserGroup(result);
    });
  }

  ngOnInit(): void {
    this.refreshData();
  }

  ngOnDestroy(): void {
    this.dataChangeSubscription.unsubscribe()
  }

  public refreshData(): void {
    this.userGroups = this.phpToolService.getUserGroups();
    this.accounts = this.phpToolService.getAccounts();
  }
}
