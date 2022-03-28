import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SingleDevUser, SingleTestUser, SingleUserProps } from 'src/app/core/models/php-tool';
import { PhpToolService } from 'src/app/core/services/php-tool.service';
import { DialogLoginComponent } from './Dialogs/dialog-login/dialog-login.component';

@Component({
  selector: 'app-php-tool',
  templateUrl: './php-tool.component.html',
  styleUrls: ['./php-tool.component.scss']
})
export class PhpToolComponent implements OnInit {

  devUsers?: SingleDevUser[];
  testUsers?: SingleTestUser[];
  private userDataChangeSubscription: Subscription;


  constructor(private phpToolService: PhpToolService, public dialog: MatDialog) {
    this.userDataChangeSubscription = phpToolService.onUserDataChange().subscribe(() => this.refreshData())
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<
      DialogLoginComponent,
      SingleUserProps | undefined,
      SingleUserProps | undefined
    >(DialogLoginComponent, {
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) return;
      this.phpToolService.addUser(result);
    });
  }

  ngOnInit(): void {
    this.refreshData();
  }

  ngOnDestroy(): void {
    this.userDataChangeSubscription.unsubscribe()
  }

  public refreshData(): void {
    this.devUsers = this.phpToolService.getDevUsers();
    this.testUsers = this.phpToolService.getTestUsers();
  }
}
