import { DataSource } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject, Observable, Subscription } from 'rxjs';
import { SingleUser, SingleUserProps } from 'src/app/core/models/php-tool2';
import { PhpTool2Service } from 'src/app/core/services/php-tool2.service';
import { DialogAddUserComponent } from '../../../Dialogs/dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit{

  @Input() userGroupId?: string;
  users?: SingleUser[]; 
  private usersChangedSubscription: Subscription;

  displayedColumns = ['name', 'seriennummer', 'praxis', 'version'];
  dataSource = new UserDataSource(this.users);

  clickedRows = new Set<SingleUserProps>();

  constructor(private phpToolService: PhpTool2Service, public dialog: MatDialog) { 
    this.usersChangedSubscription = phpToolService.onDataChaged().subscribe(() => this.refreshUsers())
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, { data: undefined });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      this.phpToolService.createUser(result, this.userGroupId);
      this.dataSource.setData(this.users); 
    });
  }

  deleteRows(): void {
    this.clickedRows.forEach(row => {
      if (row.uuid === undefined) return;
      this.phpToolService.removeUser(row.uuid, this.userGroupId);
      this.users = this.phpToolService.getAllUsers(this.userGroupId)
      this.dataSource.setData(this.users);
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

  refreshUsers() {
    this.users = this.phpToolService.getAllUsers(this.userGroupId);
  }

  ngOnInit(): void {
    this.refreshUsers();
  }

  ngOnDestroy(): void {
    this.usersChangedSubscription.unsubscribe()
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
