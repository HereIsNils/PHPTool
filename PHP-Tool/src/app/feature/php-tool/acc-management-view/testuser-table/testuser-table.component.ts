import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';
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
  dataToDispaly: SingleTestUserProps[] = this.phpToolService.getTestUsers();

  dataSourceTest = new TestUserDataSource(this.dataToDispaly)

  clickedRows = new Set<SingleTestUserProps>();

  @ViewChild(MatTable) table?: MatTable<SingleTestUserProps>;

  constructor(private phpToolService: PhpToolService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {data: undefined});

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      console.log(result);
      this.phpToolService.addTestUser(result);
      this.dataSourceTest.setData(this.dataToDispaly);
    });
  }

  deleteRows(): void {
    this.clickedRows.forEach(row => {
      if(row.uuid === undefined) return;
      this.phpToolService.removeTestUser(row.uuid);
      console.log("rows", this.dataToDispaly)
      this.dataSourceTest.setData(this.dataToDispaly);
    })
    this.clickedRows.clear();
  }

  addRow(row: SingleTestUserProps): void {
    if(this.clickedRows.has(row) === true) {
      this.clickedRows.delete(row);
      return;
    }
    this.clickedRows.add(row);
  }
}

class TestUserDataSource extends DataSource<SingleTestUserProps> {
  private _dataStream = new ReplaySubject<SingleTestUserProps[]>();

  constructor(initialData: SingleTestUserProps[]){
    super();
    this.setData(initialData);
  }

  connect(): Observable<SingleTestUserProps[]> {
    console.log("connected")  
    return this._dataStream;
  }

  disconnect(): void {console.log("disconnected")}

  setData(data: SingleTestUserProps[]) {
    this._dataStream.next(data);
    console.log("set", data)
  }
}
