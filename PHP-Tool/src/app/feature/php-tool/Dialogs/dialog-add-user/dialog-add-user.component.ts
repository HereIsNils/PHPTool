import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingleDevUserProps } from 'src/app/core/models/php-tool';
import { empty } from 'uuidv4';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  constructor(public dialogref: MatDialogRef<DialogAddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SingleDevUserProps ) {
      if (data === undefined) {
        this.data = {
          name: "",
          sn: 0,
          praxis: "",
          version: ""
        }
      }
    }

  onNoClick(): void{
    this.dialogref.close();
  }

  ngOnInit(): void {
  }

}