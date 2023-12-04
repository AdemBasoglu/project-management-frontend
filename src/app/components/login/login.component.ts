import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginResponse } from '../../interfaces/LoginResponse';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pm-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  loggedInMessage = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', this.email);

        console.log('token saved');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.status === 400) {
          this.loggedInMessage = 'Wrong email or password. Please try again.';
        } else {
          this.loggedInMessage = 'An error occurred. Please try again later.';
        }
      },
    });
  }
}
