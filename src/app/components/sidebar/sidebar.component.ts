import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../../services/user.service";
import {ProjectService} from "../../services/project.service";
import {HomeComponent} from "../home/home.component";
import {Project} from "../../interfaces/Project";
import {User} from "../../interfaces/User";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, HomeComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent implements OnInit {
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
    private projectService: ProjectService,
    private authentication:AuthenticationService
  ) {}

  ngOnInit(): void {}

  addProject(){
    this.projectService.addProject(this.project.name,this.userEmail)
  }

  logout() {
    this.authentication.logout()

  }
}
