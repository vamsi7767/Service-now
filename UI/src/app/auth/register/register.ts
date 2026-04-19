import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user = {
    name: '',
    email: '',
    password: '',
    role: 'USER'
  };

  constructor(private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {}

register() {
  this.auth.register(this.user).subscribe(() => {
    this.snackBar.open('Registered successfully', 'Close', {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['register-success-snackbar']
    });

    this.router.navigate(['/login']);
  }, (error) => {
    // ✅ Show backend error message like "Email already exists"
    const message = error?.error?.message || 'Registration failed';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['register-error-snackbar']
    });
  });
}

}
