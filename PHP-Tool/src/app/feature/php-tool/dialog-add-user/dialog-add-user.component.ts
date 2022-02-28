import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  constructor(public dialogref: MatDialogRef<DialogAddUserComponent>) {}

  onNoClick(): void{
    this.dialogref.close();
  }

  ngOnInit(): void {
  }

}
