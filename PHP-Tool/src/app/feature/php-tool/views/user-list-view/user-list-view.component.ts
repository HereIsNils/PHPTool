import { Component, Input, OnInit } from '@angular/core';
import { SingleUser, UserGroup } from 'src/app/core/models/php-tool';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent implements OnInit {
  @Input() userGroupId?: string;
  @Input() userGroup?: UserGroup;
  
  constructor() { }

  ngOnInit(): void {
  }

}
