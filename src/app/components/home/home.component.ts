import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Project } from '../../interfaces/Project';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  projects: Project[] = [];

  sessionUser: User = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    projects: [],
    tasks: [],
  };

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');

    if (email) {
      this.userService.getUserByEmail(email).subscribe({
        next: (user) => {
          (this.sessionUser = user),
            console.log(this.sessionUser),
            sessionStorage.setItem('user', JSON.stringify(this.sessionUser)),
            (this.projects = this.sessionUser.projects);
        },
        error: (err) => console.log(err),
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
