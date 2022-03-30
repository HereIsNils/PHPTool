import { Component, Input, OnInit } from '@angular/core';
import { SingleUser } from 'src/app/core/models/php-tool';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent implements OnInit {
  @Input() userGroupId?: string;
  constructor() { }

  ngOnInit(): void {
  }

}
