import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VersionSettingsProps } from 'src/app/core/models/php-tool';

@Component({
  selector: 'app-dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.scss']
})
export class DialogSettingsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VersionSettingsProps) {
      if (data === undefined) {
        this.data = {
          path: "",
          maxDownloads: 0
        }
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
      
  }

}
