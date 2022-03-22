import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { SingleDevUserProps, SingleTestUserProps } from 'src/app/core/models/php-tool';
import { PhpToolService } from 'src/app/core/services/php-tool.service';
import { DialogAddUserComponent } from '../../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-testuser-table',
  templateUrl: './testuser-table.component.html',
  styleUrls: ['./testuser-table.component.scss']
})
export class TestuserTableComponent {
  displayedColumns = ['name', 'seriennummer', 'praxis', 'version'];
  dataSourceTest: SingleTestUserProps[] = this.phpToolService.getTestUsers();

  constructor(private phpToolService: PhpToolService, public dialog: MatDialog) {}

  @ViewChild(MatTable) table?: MatTable<SingleDevUserProps>;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {data: undefined});

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      console.log(result);
      this.phpToolService.addTestUser(result);
      this.table?.renderRows();
      console.log(this.dataSourceTest);
    });
  }
}
