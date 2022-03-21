import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { PhpToolService } from 'src/app/core/services/php-tool.service';
import { AllDevUsers, SingleDevUserProps, AllTestUsers, SingleTestUserProps } from 'src/app/core/models/php-tool';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-acc-management-view',
  templateUrl: './acc-management-view.component.html',
  styleUrls: ['./acc-management-view.component.scss']
})
export class AccManagementViewComponent {
  displayedColumns = ['name', 'seriennummer', 'praxis', 'version'];
  dataSourceDev: SingleDevUserProps[] = this.phpToolService.getDevUsers();
  dataSourceTest: SingleTestUserProps[] = this.phpToolService.getTestUsers();

  constructor(private phpToolService: PhpToolService, public dialog: MatDialog) {}

  @ViewChild(MatTable) table?: MatTable<any>;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {data: undefined});

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      this.phpToolService.addDevUser(result);
      console.log(result);
      this.table?.renderRows();
      console.log(this.dataSourceDev);
    });
  }
}