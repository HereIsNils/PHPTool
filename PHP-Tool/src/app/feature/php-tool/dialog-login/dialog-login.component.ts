import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogLoginComponent>,
                      @Inject(MAT_DIALOG_DATA) public data: {name: string, password: string}) { 
                        if(data === undefined){
                          this.data = {
                            name: "",
                            password: ""
                          }
                        };
                      }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
