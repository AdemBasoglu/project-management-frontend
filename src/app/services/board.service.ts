import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Board} from "../interfaces/Board";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private baseUrl: string = 'http://localhost:8080/board/';

  constructor(private http: HttpClient) {
  }


  addBoard(board: Board): Observable<Board> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.post<Board>(`${this.baseUrl}/add/`, board);
  }


  getBoard(id: number): Observable<Board> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.get<Board>(`${this.baseUrl}/get/${id}`);
  }


  getByProjectId(id: number): Observable<Board[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.get<Board[]>(`${this.baseUrl}/getByProjectId/${id}`);
  }


  updateBoard(updateBoard: Board): Observable<Board> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.put<Board>(`${this.baseUrl}/update/`, updateBoard);
  }


  deleteBoard(id: number): Observable<Board> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.delete<Board>(`${this.baseUrl}/delete/${id}`);
  }


}
