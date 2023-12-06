import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {ProjectService} from "../../services/project.service";
import {UserService} from "../../services/user.service";
import {Project} from "../../interfaces/Project";
import {User} from "../../interfaces/User";

@Component({
  selector: 'app-add-project-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css'],
})
export class AddProjectDialogComponent implements OnInit{
  projectName: string = '';
  userEmail: string = '';
  project: Project = { id: 0, name: '' };
  sessionUser: User = { email: '', password: '', firstName: '', lastName: '', projects: [], tasks: [] };
  newProjectName: string='';

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log('home initialized');

    // LocalStorage'dan email bilgisini al
    const localEmail = localStorage.getItem('email');
    this.userEmail = localEmail ? localEmail : '';

    // Kullanıcı bilgilerini getir
    this.userService.getUserByEmail(this.userEmail).subscribe({
      next: (user) => {
        this.sessionUser = user;
        console.log(this.sessionUser);

        // Eğer kullanıcının projeleri varsa, ilk projeyi seç
        if (this.sessionUser.projects.length > 0) {
          this.project = this.sessionUser.projects[0];
        }
      },
      error: (err) => console.log(err),
    });

    // Örnek bir proje getir (ID: 3)
    this.projectService.getProjectById(3).subscribe({
      next: (project) => {
        this.project = project;
      },
      error: (err) => console.log(err),
    });
  }

  save(): void {
    // Proje kayıt işlemleri burada gerçekleştirilebilir
    // Örneğin: servis çağrısı veya işlemler...

    // Önce projeyi ekleyelim
    this.projectService.addProject(this.newProjectName, this.userEmail).subscribe({
      next: (addedProject) => {
        // Proje başarıyla eklenirse, kullanıcının güncellenmiş bilgilerini alalım
        this.userService.getUserByEmail(this.userEmail).subscribe({
          next: (user) => {
            // Kullanıcının bilgilerini güncelle
            this.sessionUser = user;

            // Dialog penceresini kapat
            this.dialogRef.close(this.newProjectName);
          },
          error: (error) => {
            console.error('Kullanıcı bilgileri alınırken bir hata oluştu:', error);
          }
        });
      },
      error: (error) => {
        console.error('Proje eklenirken bir hata oluştu:', error);
      }
    });
  }

  cancel(): void {
    // İptal işlemi
    this.dialogRef.close();
  }
}
