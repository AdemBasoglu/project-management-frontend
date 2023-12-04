import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl: string = 'http://localhost:8080/project';

  constructor(private http: HttpClient) {}

  addProject(projectName: string, userEmail: string): Observable<Project> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post<Project>(
      `${this.baseUrl}/add?projectName=${projectName}&userEmail=${userEmail}`,
      {},
      { headers }
    );
  }

  getProjectById(projectId: number): Observable<Project> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<Project>(`${this.baseUrl}/get/${projectId}`, {
      headers,
    });
  }

  getAllProjects(): Observable<Project[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<Project[]>(`${this.baseUrl}/get-all`, {
      headers,
    });
  }

  updateProject(newName: string, projectId: number): Observable<Project> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put<Project>(
      `${this.baseUrl}/update?newName=${newName}&id=${projectId}`,
      {},
      { headers }
    );
  }

  addUserToProject(projectId: number, userEmail: string): Observable<Project> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put<Project>(
      `${this.baseUrl}/add-user?projectId=${projectId}&email=${userEmail}`,
      {},
      { headers }
    );
  }

  //NOTE - Pay attention to what actually should be return both backend and frontend.
  deleteProject(projectId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.delete(`${this.baseUrl}/delete/${projectId}`, {
      headers,
    });
  }
}
