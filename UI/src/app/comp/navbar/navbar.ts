import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
   MatToolbarModule,
    MatIconModule,
   MatButtonModule,
   RouterLink

  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {


  constructor(private router:Router){}

  
   
logout() {
 localStorage.removeItem('user');

    // ✅ Redirect to login page
    this.router.navigate(['/login']);
  

}

}
