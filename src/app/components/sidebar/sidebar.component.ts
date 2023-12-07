import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { HomeComponent } from '../home/home.component';
import { Project } from '../../interfaces/Project';
import { User } from '../../interfaces/User';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../dialogs/project-dialog/project-dialog.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, HomeComponent, RouterLink, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  userEmail: string = '';

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
    private projectService: ProjectService,
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const localEmail = localStorage.getItem('email');
    this.userEmail = localEmail ? localEmail : '';

    this.userService.getUserByEmail(this.userEmail).subscribe({
      next: (user) => {
        (this.sessionUser = user), console.log(this.sessionUser);
      },
      error: (err) => console.log(err),
    });
  }

  addProject() {
    const dialogRef = this.dialog.open(ProjectDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.projectService.addProject(result, this.userEmail);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
