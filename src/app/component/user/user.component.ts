import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css'
})
export class UserComponent {
    user: any = {
        name: 'John Doe',
        info: 'Is a software engineer.'
    };
}
