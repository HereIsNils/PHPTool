import { DataSource } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject, Observable } from 'rxjs';
import { SingleUser, SingleUserProps } from 'src/app/core/models/php-tool2';
import { PhpTool2Service } from 'src/app/core/services/php-tool2.service';
import { DialogAddUserComponent } from '../../../Dialogs/dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent {

  @Input() users?: SingleUser[]; 
  @Input() userGroupId?: string

  displayedColumns = ['name', 'seriennummer', 'praxis', 'version'];
  dataToDispaly: SingleUserProps[] = this.phpToolService.getAllUsers(this.userGroupId);

  dataSource = new UserDataSource(this.dataToDispaly);

  clickedRows = new Set<SingleUserProps>();

  constructor(private phpToolService: PhpTool2Service, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, { data: undefined });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      this.phpToolService.createUser(result, this.userGroupId);
      this.dataSource.setData(this.dataToDispaly); //sth wrong here
      console.log("data", this.dataToDispaly);
    });
  }

  deleteRows(): void {
    this.clickedRows.forEach(row => {
      if (row.uuid === undefined) return;
      this.phpToolService.removeUser(row.uuid, this.userGroupId);
      this.dataToDispaly = this.phpToolService.getAllUsers(this.userGroupId)
      this.dataSource.setData(this.dataToDispaly);
    })
    this.clickedRows.clear();
  }

  addRow(row: SingleUserProps): void {
    if (this.clickedRows.has(row) === true) {
      this.clickedRows.delete(row);
      return;
    }
    this.clickedRows.add(row);
  }
}


class UserDataSource extends DataSource<SingleUserProps> {
  private _dataStream = new ReplaySubject<SingleUserProps[]>();

  constructor(initialData?: SingleUserProps[]) {
    super();
    console.log("inidata", initialData)
    this.setData(initialData);
  }

  connect(): Observable<SingleUserProps[]> {
    return this._dataStream;
  }

  disconnect(): void { console.log("disconnected") }

  setData(data?: SingleUserProps[]) {
    if (data === undefined) return;
    this._dataStream.next(data);
  }
}
