import { Component, OnInit, ViewChild } from '@angular/core';
import {DataSource } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { SingleDevUserProps } from 'src/app/core/models/php-tool';
import { PhpToolService } from 'src/app/core/services/php-tool.service';
import { DialogAddUserComponent } from '../../dialog-add-user/dialog-add-user.component';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-devuser-table',
  templateUrl: './devuser-table.component.html',
  styleUrls: ['./devuser-table.component.scss']
})
export class DevuserTableComponent {
  displayedColumns = ['name', 'seriennummer', 'praxis', 'version'];
  dataToDispaly: SingleDevUserProps[] = this.phpToolService.getDevUsers();

  dataSourceDev = new DevUserDataSource(this.dataToDispaly);

  clickedRows = new Set<SingleDevUserProps>();

  constructor(private phpToolService: PhpToolService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {data: undefined});

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      console.log(result);
      this.phpToolService.addDevUser(result);
      this.dataSourceDev.setData(this.dataToDispaly);
    });
  }

  deleteRows(): void {
    this.clickedRows.forEach(row => {
      if(row.uuid === undefined) return;
      this.phpToolService.removeDevUser(row.uuid);
      this.dataToDispaly = this.phpToolService.getDevUsers();
      this.dataSourceDev.setData(this.dataToDispaly);
    })
    this.clickedRows.clear();
  }

  addRow(row: SingleDevUserProps): void {
    if(this.clickedRows.has(row) === true) {
      this.clickedRows.delete(row);
      return;
    }
    this.clickedRows.add(row);
  }
}


class DevUserDataSource extends DataSource<SingleDevUserProps> {
  private _dataStream = new ReplaySubject<SingleDevUserProps[]>();

  constructor(initialData: SingleDevUserProps[]){
    super();
    this.setData(initialData);
  }

  connect(): Observable<SingleDevUserProps[]> {  
    return this._dataStream;
  }

  disconnect(): void {console.log("disconnected")}

  setData(data: SingleDevUserProps[]) {
    this._dataStream.next(data);
  }
}