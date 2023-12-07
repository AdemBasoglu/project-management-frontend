import { Component } from '@angular/core';
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
export class RegisterComponent {
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

  register() {
    if (!this.newUser.email || !this.newUser.password) {
      alert('PLease enter an email and password.');
      return;
    }

    this.authService.register(this.newUser).subscribe({
      next: (response) => {
        this.registrationSuccess = true;
        alert('You have successfully registered. Please log in.');

        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error adding user', error);
      },
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
