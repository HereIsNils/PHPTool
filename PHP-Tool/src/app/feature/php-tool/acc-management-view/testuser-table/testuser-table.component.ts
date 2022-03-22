import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { SingleTestUserProps } from 'src/app/core/models/php-tool';
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
  clickedRows = new Set<SingleTestUserProps>();

  @ViewChild(MatTable) table?: MatTable<SingleTestUserProps>;

  constructor(private phpToolService: PhpToolService, public dialog: MatDialog) {}


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {data: undefined});

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      console.log(result);
      this.phpToolService.addTestUser(result);
      if(this.table === undefined) return;
      this.table.renderRows();
      console.log(this.dataSourceTest);
    });
  }

  deleteRows(): void {
    this.clickedRows.forEach(row => {
      if(row.uuid === undefined) return;
      this.phpToolService.removeTestUser(row.uuid);
      //this.dataSourceTest = this.dataSourceTest.filter(u => u.uuid !== row.uuid);
      console.log(this.phpToolService.getTestUsers())
    })
    this.clickedRows.clear();

    if(this.table === undefined) return;
    this.table.renderRows();
  }
}
