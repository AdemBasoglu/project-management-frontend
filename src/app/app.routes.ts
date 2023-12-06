import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { BoardEditComponent } from './components/board-edit/board-edit.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'board-edit', component: BoardEditComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: HomeComponent },

];
