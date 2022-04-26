import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserGroupProps } from 'src/app/core/models/php-tool';

@Component({
  selector: 'app-dialog-create-usergroup',
  templateUrl: './dialog-create-usergroup.component.html',
  styleUrls: ['./dialog-create-usergroup.component.scss']
})
export class DialogCreateUsergroupComponent implements OnInit {

  textFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);

  constructor(public dialogref: MatDialogRef<DialogCreateUsergroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserGroupProps) {
    if (data === undefined) {
      this.data = {
        name: "",
        limit: "",
        users: []
      }
    }
  }

  onNoClick(): void {
    this.dialogref.close();
  }
  ngOnInit(): void {
  }

}
