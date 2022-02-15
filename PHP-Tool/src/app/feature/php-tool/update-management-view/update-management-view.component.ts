import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';

@Component({
  selector: 'app-update-management-view',
  templateUrl: './update-management-view.component.html',
  styleUrls: ['./update-management-view.component.scss']
})
export class UpdateManagementViewComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open<DialogLoginComponent>(DialogLoginComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result === undefined) return;
      console.log(result);
    });
  }


  ngOnInit(): void {
  }

}
