import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl: string = 'http://localhost:8080/task';

  constructor(private http: HttpClient) {}

  addTask(newTask: Task, boardId: number): Observable<Task> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post<Task>(
      `${this.baseUrl}/add?boardId=${boardId}`,
      newTask,
      { headers }
    );
  }

  getTaskById(taskId: number): Observable<Task> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<Task>(`${this.baseUrl}/get/${taskId}`, { headers });
  }

  getTaskByUserEmail(userEmail: string): Observable<Task[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<Task[]>(`${this.baseUrl}/get-by-user/${userEmail}`, {
      headers,
    });
  }

  getTaskByBoardId(boardId: number): Observable<Task[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<Task[]>(`${this.baseUrl}/get-by-board/${boardId}`, {
      headers,
    });
  }

  updateTask(updatedTask: Task, taskId: number): Observable<Task> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put<Task>(
      `${this.baseUrl}/update/${taskId}`,
      updatedTask,
      { headers }
    );
  }

  addUserToTask(taskId: number, userEmail: string): Observable<Task> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put<Task>(
      `${this.baseUrl}/add-user?taskId=${taskId}&email=${userEmail}`,
      {},
      { headers }
    );
  }

  changeBoard(taskId: number, boardId: number): Observable<Task> {
    console.log('Change board');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put<Task>(
      `${this.baseUrl}/change-board?taskId=${taskId}&boardId=${boardId}`,
      {},
      { headers }
    );
  }

  deleteTask(taskId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.delete<Task>(`${this.baseUrl}/delete/${taskId}`, {
      headers,
    });
  }
}
