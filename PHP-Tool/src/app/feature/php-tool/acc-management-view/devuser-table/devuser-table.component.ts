import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { SingleDevUserProps } from 'src/app/core/models/php-tool';
import { PhpToolService } from 'src/app/core/services/php-tool.service';
import { DialogAddUserComponent } from '../../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-devuser-table',
  templateUrl: './devuser-table.component.html',
  styleUrls: ['./devuser-table.component.scss']
})
export class DevuserTableComponent {
  displayedColumns = ['name', 'seriennummer', 'praxis', 'version'];
  dataSourceDev: SingleDevUserProps[] = this.phpToolService.getDevUsers();

  constructor(private phpToolService: PhpToolService, public dialog: MatDialog) {}

  @ViewChild(MatTable) table?: MatTable<SingleDevUserProps>;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {data: undefined});

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      console.log(result);
      this.phpToolService.addDevUser(result);
      this.table?.renderRows();
      console.log(this.dataSourceDev);
    });
  }
}
