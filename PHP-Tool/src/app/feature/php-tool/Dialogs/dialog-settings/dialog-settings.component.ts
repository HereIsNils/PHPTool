import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.scss']
})
export class DialogSettingsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSettingsComponent>
    ) {
      
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
      
  }

}
