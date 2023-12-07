import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginResponse } from '../../interfaces/LoginResponse';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoginData } from '../../interfaces/LoginData';

@Component({
  selector: 'pm-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  data: LoginData = {
    email: '',
    password: '',
    loggedInMessage: '',
  };

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('email')) this.router.navigate(['/home']);
  }

  login() {
    this.authService.login(this.data.email, this.data.password).subscribe({
      next: (response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', this.data.email);

        console.log('token saved');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.status === 400) {
          this.data.loggedInMessage =
            'Wrong email or password. Please try again.';
        } else {
          this.data.loggedInMessage =
            'An error occurred. Please try again later.';
        }
      },
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
