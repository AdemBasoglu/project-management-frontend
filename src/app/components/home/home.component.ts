import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userEmail: string = '';

  sessionUser: User = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    projects: [],
    tasks: [],
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log('home initialized');

    const localEmail = localStorage.getItem('email');
    this.userEmail = localEmail ? localEmail : '';

    this.userService.getUserByEmail(this.userEmail).subscribe({
      next: (user) => {(this.sessionUser = user), console.log(this.sessionUser);},
      error: (err) => console.log(err),
    });
  }
}
