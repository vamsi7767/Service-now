import { Component, OnInit } from '@angular/core';
import { IssueServiceTs } from '../../service/issue-service.ts';
import { AuthService } from '../../service/auth-service.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-create-issue-component',
  imports: [CommonModule,FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './create-issue-component.html',
  styleUrl: './create-issue-component.css',
})
export class CreateIssueComponent implements OnInit {
  
   users: any[] = [];
  issue = {
    title: '',
    description: '',
    status: 'OPEN',
    assignedTo: { id: null },
    createdBy: { id: null }
  };

  constructor(
    private issueService: IssueServiceTs,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.issueService.getAllUsers().subscribe(res => this.users = res);

    // set createdBy to logged-in user
    const currentUser = this.auth.getUser();
    this.issue.createdBy.id = currentUser?.id;
  }
  

  createIssue() {
    this.issueService.createIssue(this.issue).subscribe({
      next: () => {
        this.snackBar.open('Issue created successfully', 'Close', {
          duration: 2500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['issue-success-snackbar']
        });
      },
      error: (err) => {
        const message = err?.error?.message || 'Failed to create issue';
        this.snackBar.open(message, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['issue-error-snackbar']
        });
      }
    });
  }



}
