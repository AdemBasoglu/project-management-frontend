import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from "../../services/user.service";
import {ProjectService} from "../../services/project.service";
import {HomeComponent} from "../home/home.component";
import {Project} from "../../interfaces/Project";
import {User} from "../../interfaces/User";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from '@angular/material/dialog';
import {AddProjectDialogComponent} from '../add-project-dialog/add-project-dialog.component'; // Ek bir bileşen olarak oluşturmanız gerekir

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, HomeComponent, RouterLink, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit {
  userEmail: string = '';

  project: Project = {
    id: 0, name: '',
  };

  sessionUser: User = {
    email: '', password: '', firstName: '', lastName: '', projects: [], tasks: [],
  };

  constructor(private userService: UserService, private projectService: ProjectService, private authentication: AuthenticationService, private router: Router, private dialog: MatDialog // MatDialog'ı buraya ekleyin
  ) {
  }

  ngOnInit(): void {
    console.log('home initialized');

    const localEmail = localStorage.getItem('email');
    this.userEmail = localEmail ? localEmail : '';

    this.userService.getUserByEmail(this.userEmail).subscribe({
      next: (user) => {
        (this.sessionUser = user), console.log(this.sessionUser), (this.project = this.sessionUser.projects[0]);
      }, error: (err) => console.log(err),
    });

    this.projectService.getProjectById(3).subscribe({
      next: (project) => {
        this.project = project;
      }, error: (err) => console.log(err),
    });
  }


  addProject() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Dialogdan gelen proje adını kullanarak yeni proje ekleme işlemleri
        this.projectService.addProject(result, this.userEmail);
      }
    });
  }

  logout() {
    this.authentication.logout()
    this.router.navigate(['/login']);

  }
}
