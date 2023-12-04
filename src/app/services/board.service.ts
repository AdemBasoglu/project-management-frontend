import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Board } from '../interfaces/Board';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private baseUrl: string = 'http://localhost:8080/board';

  constructor(private http: HttpClient) {}

  addBoard(boardName: string, projectId: number): Observable<Board> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post<Board>(
      `${this.baseUrl}/add?boardName=${boardName}&projectId=${projectId}`,
      {},
      { headers }
    );
  }

  getBoardById(boardId: number): Observable<Board> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<Board>(`${this.baseUrl}/get/${boardId}`, { headers });
  }

  getBoardByProjectId(projectId: number): Observable<Board[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<Board[]>(
      `${this.baseUrl}/get-by-project/${projectId}`,
      { headers }
    );
  }

  updateBoard(updatedBoard: Board, boardId: number): Observable<Board> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put<Board>(
      `${this.baseUrl}/update/${boardId}`,
      updatedBoard,
      { headers }
    );
  }

  //NOTE - Pay attention to what actually should be return both backend and frontend.
  deleteBoard(boardId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.delete(`${this.baseUrl}/delete/${boardId}`, { headers });
  }
}
