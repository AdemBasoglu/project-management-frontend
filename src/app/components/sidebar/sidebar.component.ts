import { Component, OnInit, Input } from '@angular/core';
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
import { SessionUserService } from '../../services/session-user.service';
import { Subscription } from 'rxjs';

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

  private subscription: Subscription;
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private authService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    private sessionService: SessionUserService
  ) {
    this.subscription = this.sessionService.data$.subscribe((sessionUser) => {
      this.sessionUser = sessionUser;
    });
  }

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

  viewAllProjects() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
