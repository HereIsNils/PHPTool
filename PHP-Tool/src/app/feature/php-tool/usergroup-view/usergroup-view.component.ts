import { Component, Input, OnInit } from '@angular/core';
import { UserGroup } from 'src/app/core/models/php-tool2';
import { PhpTool2Service } from 'src/app/core/services/php-tool2.service';

@Component({
  selector: 'app-usergroup-view',
  templateUrl: './usergroup-view.component.html',
  styleUrls: ['./usergroup-view.component.scss']
})
export class UsergroupViewComponent implements OnInit {

  @Input() userGroup?: UserGroup;
  @Input() userGroupId?: string;

  constructor(private phpToolService: PhpTool2Service) { }

  ngOnInit(): void {
  }

}
