import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { PhpToolService } from 'src/app/core/services/php-tool.service';

@Component({
  selector: 'app-acc-management-view',
  templateUrl: './acc-management-view.component.html',
  styleUrls: ['./acc-management-view.component.scss']
})
export class AccManagementViewComponent {
  displayedColumns = ['name', 'seriennummer', 'praxis', 'version'];
  dataSource = ELEMENT_DATA;

  constructor(private phpToolService: PhpToolService, public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {data: undefined});

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) return;
      this.phpToolService.addDevUser(result);
      console.log(result);
    });
  }
}

export interface PeriodicElement {
  name: string;
  version: string;
  sn: number;
  praxis: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {version: '234-2349-02834', name: 'Hanz Müller', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz Müller', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz Müller', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz Müller', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz Müller', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz Müller', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz Müller', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz Müller', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz Müller', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz Müller', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz Müller', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz rasoteh', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz rasoteh', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz rasoteh', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz rasoteh', praxis: 'ZAHNwehLOS', sn: 239847239239487},
  {version: '234-2349-02834', name: 'Hanz rasoteh', praxis: 'ZAHNwehLOS', sn: 239847239239487},
];
