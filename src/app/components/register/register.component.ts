import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/User';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pm-register',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  newUser: User = {
    email: '',
    projects: [],
    tasks: [],
    firstName: '',
    lastName: '',
    password: '',
  };

  registrationSuccess: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem("email")) this.router.navigate(['/home']);
  }

  register() {
    if (!this.newUser.email || !this.newUser.password) {
      alert('Please enter an email and password.');
      return;
    }

    this.authService.register(this.newUser).subscribe({
      next: (response) => {
        this.registrationSuccess = true;
        alert('You have successfully registered. Please log in.');
        this.goToLogin();
      },
      error: (error) => {
        console.error('Error adding user', error);
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
