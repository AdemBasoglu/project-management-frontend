import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Project } from '../../interfaces/Project';
import { User } from '../../interfaces/User';
import { UserService } from '../../services/user.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SessionInfoService } from '../../services/session-info.service';
import {
  ProjectDialogData,
  ProjectDialogComponent,
} from '../dialogs/project-dialog/project-dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { ProjectService } from '../../services/project.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule, MatIconModule],
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

  constructor(
    private router: Router,
    private userService: UserService,
    public dialog: Dialog,
    private projetcService: ProjectService,
    private sessionService: SessionInfoService
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');

    if (email) {
      this.initSessionUser(email);
    } else {
      this.router.navigate(['/login']);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open<ProjectDialogData>(
      ProjectDialogComponent,
      {
        width: '500px',
        data: { name: '', description: '' },
      }
    );

    dialogRef.closed.subscribe((result) => {
      if (result) {
        this.projetcService
          .addProject(result.name, this.sessionUser.email)
          .subscribe({
            next: (project) => {
              this.projects.push(project);
              this.sessionUser.projects = this.projects;
              this.updateSessionInfo(this.sessionUser);
              // this.side.updateProjects(this.projects);
            },
            error: (err) => console.log(err),
          });
      }
    });
  }

  initSessionUser(email: string) {
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => {
        (this.sessionUser = user),
          // console.log(this.sessionUser),
          // sessionStorage.setItem('user', JSON.stringify(this.sessionUser)),
          this.updateSessionInfo(this.sessionUser),
          (this.projects = this.sessionUser.projects);
      },
      error: (err) => console.log(err),
    });
  }

  updateSessionInfo(user: User) {
    this.sessionService.updateData(user);
  }
}
