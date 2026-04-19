import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-issue-comments-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Comments for Issue #{{ data.issue.id }}</h2>
    <mat-dialog-content>
      <!-- Existing comments -->
      <div *ngFor="let c of data.issue.comments">
        <strong>{{ c.user?.name }}</strong> ({{ c.createdAt | date:'short' }}):
        <p>{{ c.message }}</p>
      </div>

      <!-- Add new comment -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Add Comment</mat-label>
        <textarea matInput [(ngModel)]="commentText"></textarea>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="submitComment()">Submit</button>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  imports: [
    CommonModule,
    FormsModule,          // ✅ Needed for [(ngModel)]
    MatDialogModule,      // ✅ Provides <mat-dialog-*>
    MatButtonModule,      // ✅ For <button mat-button>
    MatFormFieldModule,   // ✅ For <mat-form-field>
    MatInputModule        // ✅ For <textarea matInput>
  ]
})
export class IssueCommentsDialog {
  commentText: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  submitComment() {
    if (this.commentText.trim()) {
      this.data.onSubmit(this.data.issue.id, this.commentText);
      this.commentText = '';
    }
  }
}
