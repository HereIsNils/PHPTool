import { Component, Input, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SingleUser, SingleUserProps } from "src/app/core/models/php-tool";
import { PhpToolService } from "src/app/core/services/php-tool.service";
import { DialogLoginComponent } from "../Dialogs/dialog-login/dialog-login.component";
import { DialogSettingsComponent } from "../Dialogs/dialog-settings/dialog-settings.component";

@Component({
  selector: "app-update-management-view",
  templateUrl: "./update-management-view.component.html",
  styleUrls: ["./update-management-view.component.scss"],
})
export class UpdateManagementViewComponent implements OnInit {
  @Input() user?: SingleUser;

  constructor(
    private phpToolService: PhpToolService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open<
      DialogLoginComponent,
      SingleUserProps | undefined,
      SingleUserProps | undefined
    >(DialogLoginComponent, {
      data: undefined,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) return;
      this.phpToolService.addUser(result);
    });
  }

  openSettingsDialog(): void {
    const dialogRef = this.dialog.open<DialogSettingsComponent>(DialogSettingsComponent, {data: undefined});

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) return;
    });
  }

  ngOnInit(): void {}
}
