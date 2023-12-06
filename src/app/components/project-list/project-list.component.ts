import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Project } from '../../interfaces/Project';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'pm-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

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
    }
  }
}
