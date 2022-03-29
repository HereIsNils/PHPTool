import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SingleDevUser, SingleTestUser, SingleUserProps } from 'src/app/core/models/php-tool';
import { SingleAccount, SingleAccountProps, UserGroup } from 'src/app/core/models/php-tool2';
import { PhpToolService } from 'src/app/core/services/php-tool.service';
import { PhpTool2Service } from 'src/app/core/services/php-tool2.service';
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


  constructor(private phpToolService: PhpTool2Service, public dialog: MatDialog) {
    this.dataChangeSubscription = phpToolService.onDataChaged().subscribe(() => this.refreshData())
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
    const dialogRef = this.dialog.open<DialogCreateUsergroupComponent>(DialogCreateUsergroupComponent, { data: undefined });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) return;
      this.phpToolService.createUserGroup(result);
    })
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
