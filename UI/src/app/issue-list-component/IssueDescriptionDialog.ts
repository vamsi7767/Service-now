import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-issue-description-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Description</h2>
    <mat-dialog-content>
      <p style="white-space: pre-line;">{{ data.description }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  imports: [
    MatDialogModule,   // ✅ provides <mat-dialog-content>, <mat-dialog-actions>, mat-dialog-close
    MatButtonModule    // ✅ provides <button mat-button>
  ]
})
export class IssueDescriptionDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
