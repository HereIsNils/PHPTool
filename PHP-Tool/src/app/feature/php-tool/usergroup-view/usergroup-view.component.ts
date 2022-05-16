import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserGroup } from 'src/app/core/models/php-tool';
import { PhpToolService } from 'src/app/core/services/php-tool.service';
import { DialogCreateUsergroupComponent } from '../Dialogs/dialog-create-usergroup/dialog-create-usergroup.component';

@Component({
  selector: 'app-usergroup-view',
  templateUrl: './usergroup-view.component.html',
  styleUrls: ['./usergroup-view.component.scss']
})
export class UsergroupViewComponent implements OnInit {

  @Input() userGroup?: UserGroup;
  @Input() userGroupId?: string;

  constructor(
    private phpToolService: PhpToolService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  deleteUserGroup() {
    this.phpToolService.removeUserGroup(this.userGroupId);

    // delete the directory on the server
    let fd = new FormData();
    if (this.userGroup?.name === undefined) {
      console.error("No group name found");
      return;
    }
    fd.append('dir', this.userGroup.name);

    let xhttp = new XMLHttpRequest();

    // Set POST method and ajax file path
    xhttp.open("POST", "deleteDir.php", true);

     // call on request changes state
     xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        let response = this.responseText;
        console.log(response);
        if (response === "1") {
          alert("Directory deleted.");
        } else {
          alert("Could not delete directory.");
        }
      }
    };
    // Send request with data
    xhttp.send(fd);

  }

  updateUserGroup() {
    let data = this.phpToolService.getUserGroup(this.userGroupId);
    const dialogRef = this.dialog.open(DialogCreateUsergroupComponent, { data });

    dialogRef.afterClosed().subscribe((result: UserGroup) => {
      if (result === undefined) {
        this.snackBar.open("Keine Änderungen vorgenommen.", "", { duration: 3000 });
        return;
      }
      try {
        this.phpToolService.updateUserGroup(result, this.userGroupId);
        this.snackBar.open("Änderungen erfolgreich gespeichert.", "", { duration: 3000 });
      } catch (e) {
        console.error(e);
        this.snackBar.open("Änderungen konnten nicht gespeichtert werden!", "", { duration: 3000 });
      }
    });
  }

  ngOnInit(): void {
  }

  selectFile(): void {
    const app = this;
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = ".kavoupdate";
    input.onchange = _ => {
      let file = input.files;

      if (file !== null) {

        let fd = new FormData();
        let files = file[0]; // files contains all data from the selected file
        fd.append('file', files);

        if (this.userGroup?.name === undefined) {
          console.error("No group name found");
          return;
        }
        fd.append('dir', this.userGroup.name);

        let xhttp = new XMLHttpRequest();

        // Set POST method and ajax file path
        xhttp.open("POST", "uploadFile.php", true);

        // call on request changes state
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {

            let response = this.responseText;
            console.log(response);
            if (response === "1") {
              app.snackBar.open("Datei erfolgreich hochgeladen.", "", { duration: 3000 });
            } else {
              app.snackBar.open("Datei konnte nicht hochgeladen werden.", "", { duration: 3000 });
            }
          }
        };
        // Send request with data
        xhttp.send(fd);
      }
    }
    input.click();
  }

}
