import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IssueServiceTs } from '../../service/issue-service.ts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admindashbord',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './admindashbord.html',
  styleUrl: './admindashbord.css',
})
export class Admindashbord {
  stats$!: Observable<any>;

  constructor(private router: Router, private issueService: IssueServiceTs) {}

  ngOnInit(): void {
    this.stats$ = this.issueService.getStats();
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
