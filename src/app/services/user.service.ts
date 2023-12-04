import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  addUser(newUser: User): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post<User>(`${this.baseUrl}/add`, newUser, { headers });
  }

  getUserByEmail(email: string): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<User>(`${this.baseUrl}/get/${email}`, { headers });
  }

  updateUser(updateUser: User): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put<User>(
      `${this.baseUrl}/update/${updateUser.email}`,
      updateUser,
      {
        headers,
      }
    );
  }

  deleteUser(email: string): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.delete<User>(`${this.baseUrl}/delete/${email}`, {
      headers,
    });
  }
}
