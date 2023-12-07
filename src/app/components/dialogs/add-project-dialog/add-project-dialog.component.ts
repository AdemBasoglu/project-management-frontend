import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProjectService } from '../../../services/project.service';
import { UserService } from '../../../services/user.service';
import { Project } from '../../../interfaces/Project';
import { User } from '../../../interfaces/User';

@Component({
  selector: 'app-add-project-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css'],
})
export class AddProjectDialogComponent implements OnInit {
  projectName: string = '';
  userEmail: string = '';
  project: Project = { id: 0, name: '' };
  sessionUser: User = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    projects: [],
    tasks: [],
  };
  newProjectName: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const localEmail = localStorage.getItem('email');
    this.userEmail = localEmail ? localEmail : '';

    this.userService.getUserByEmail(this.userEmail).subscribe({
      next: (user) => {
        this.sessionUser = user;
        console.log(this.sessionUser);

        if (this.sessionUser.projects.length > 0) {
          this.project = this.sessionUser.projects[0];
        }
      },
      error: (err) => console.log(err),
    });
  }

  save(): void {
    this.projectService
      .addProject(this.newProjectName, this.userEmail)
      .subscribe({
        next: (addedProject) => {
          this.userService.getUserByEmail(this.userEmail).subscribe({
            next: (user) => {
              this.sessionUser = user;

              this.dialogRef.close(this.newProjectName);
            },
            error: (error) => {
              console.error(
                'An error occurred while retrieving user information:',
                error
              );
            },
          });
        },
        error: (error) => {
          console.error('An error occurred while adding the project:', error);
        },
      });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
