import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionUserService {
  user: User = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    projects: [],
    tasks: [],
  };
  private dataSubject = new BehaviorSubject<User>(this.user);
  public data$: Observable<User> = this.dataSubject.asObservable();

  updateData(data: User) {
    this.dataSubject.next(data);
  }
}
