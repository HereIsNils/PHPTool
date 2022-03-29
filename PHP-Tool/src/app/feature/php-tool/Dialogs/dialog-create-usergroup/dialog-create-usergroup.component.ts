import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserGroupProps } from 'src/app/core/models/php-tool2';

@Component({
  selector: 'app-dialog-create-usergroup',
  templateUrl: './dialog-create-usergroup.component.html',
  styleUrls: ['./dialog-create-usergroup.component.scss']
})
export class DialogCreateUsergroupComponent implements OnInit {

  constructor(public dialogref: MatDialogRef<DialogCreateUsergroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserGroupProps) {
    if (data === undefined) {
      this.data = {
        name: "",
        users: [],
        settings: {
          path: "",
          limit: NaN
        }
      }
    }
  }

  onNoClick(): void {
    this.dialogref.close();
  }
  ngOnInit(): void {
  }

}
