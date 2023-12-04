import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { LoginResponse } from '../interfaces/LoginResponse';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, {
      email: email,
      password: password,
    });
  }

  register(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, newUser);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
}
