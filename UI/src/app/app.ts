import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Navbar } from "./comp/navbar/navbar";
import { Footer } from "./comp/footer/footer";

 
@Component({
 selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar,
    Footer
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 
}
