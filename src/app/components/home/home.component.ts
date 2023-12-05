import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import { ProjectComponent } from '../project/project.component';
import { Project } from '../../interfaces/Project';
import { ProjectService } from '../../services/project.service';
import {NgIf} from "@angular/common";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProjectComponent, NgIf, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  userEmail: string = '';

  project: Project = {
    id: 0,
    name: '',
  };

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
    console.log('home initialized');

    const localEmail = localStorage.getItem('email');
    this.userEmail = localEmail ? localEmail : '';

    this.userService.getUserByEmail(this.userEmail).subscribe({
      next: (user) => {
        (this.sessionUser = user),
          console.log(this.sessionUser),
          (this.project = this.sessionUser.projects[0]);
      },
      error: (err) => console.log(err),
    });

    this.projectService.getProjectById(3).subscribe({
      next: (project) => {
        this.project = project;
      },
      error: (err) => console.log(err),
    });
  }
}
