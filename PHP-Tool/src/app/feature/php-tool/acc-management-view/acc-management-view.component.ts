import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acc-management-view',
  templateUrl: './acc-management-view.component.html',
  styleUrls: ['./acc-management-view.component.scss']
})
export class AccManagementViewComponent {
  displayedColumns = ['name', 'seriennummer', 'praxis', 'version'];
  dataSource = ELEMENT_DATA;
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
