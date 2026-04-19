import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth-service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IssueServiceTs } from '../service/issue-service.ts';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent implements OnInit {


  user: any;


  total = 0;
  open = 0;
  inProgress = 0;
  completed = 0;

  constructor(private auth: AuthService,private issueService:IssueServiceTs) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
    this.loadData();
  }

   loadData() {

    // Total issues
    this.issueService.getAllIssues().subscribe((data: any) => {
      this.total = data.length;
    });

    // OPEN
    this.issueService.getByStatus('OPEN').subscribe((data: any) => {
      this.open = data.length;
    });

    // IN_PROGRESS
    this.issueService.getByStatus('IN_PROGRESS').subscribe((data: any) => {
      this.inProgress = data.length;
    });

    // COMPLETED
    this.issueService.getByStatus('COMPLETED').subscribe((data: any) => {
      this.completed = data.length;
    });
  }


}
