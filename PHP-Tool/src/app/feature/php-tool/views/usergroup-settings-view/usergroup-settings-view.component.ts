import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserGroupSettings } from 'src/app/core/models/php-tool';
import { PhpToolService } from 'src/app/core/services/php-tool.service';
import { DialogSettingsComponent } from '../../Dialogs/dialog-settings/dialog-settings.component';

@Component({
  selector: 'app-usergroup-settings-view',
  templateUrl: './usergroup-settings-view.component.html',
  styleUrls: ['./usergroup-settings-view.component.scss']
})
export class UsergroupSettingsViewComponent implements OnInit {

  @Input() settings?: UserGroupSettings;
  constructor(
    private phpToolService: PhpToolService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  openSettingsDialog(flag: string): void {
    const dialogRef = this.dialog.open<DialogSettingsComponent>(DialogSettingsComponent, {data: undefined});

    dialogRef.afterClosed().subscribe((result) => {
      this.snackBar.open("Änderungen erfolgreich gespeichert.", "", {duration: 3000})
    });
  }
  ngOnInit(): void {
  }

  selectFile(): void {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
      let file = input.files
      console.log(file);
    };
    input.click();
  }

}