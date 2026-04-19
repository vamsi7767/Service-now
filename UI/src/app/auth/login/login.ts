import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {}
login() {
  this.auth.login({
    email: this.email,
    password: this.password
  }).subscribe((res: any) => {
    this.auth.saveUser(res); // save user info (including role)

    this.snackBar.open('Login success', 'Close', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['login-success-snackbar']
    });

    // ✅ Role-based navigation
    if (res.role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/issue']); // or /issue for normal users
    }
  }, (error) => {
    const message = error?.error?.message || 'Login failed';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['login-error-snackbar']
    });
  });
}


}
