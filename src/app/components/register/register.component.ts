import {Component} from '@angular/core';
import {User} from "../../interfaces/User";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'pm-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  newUser: User = {
    email: '',
    projects: [],
    tasks: [],
    firstName: '',
    lastName: '',
    password: '',
  };

  registrationSuccess: boolean = false;


  constructor(private router: Router,
              private userService: UserService) {
  }

  register() {
    this.userService.addUser(this.newUser).subscribe(
      (response) => {
        console.log('User added successfully', response);
        this.registrationSuccess = true;

        alert("You have successfully registered. Please log in.");

        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error adding user', error);
      }
    );
  }


}
