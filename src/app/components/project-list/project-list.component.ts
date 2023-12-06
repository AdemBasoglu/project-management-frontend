import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../interfaces/Project';
import { User } from '../../interfaces/User';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';

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

  constructor(
    private userService: UserService,
    private projectService: ProjectService
  ) {}

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
