import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './task.component.html',
    styleUrl: './task.component.css'
})
export class TaskComponent {
    task: any = {
        title: 'Sample Task',
        description: 'This is a sample task description.',
        status: 'In Progress'
    };
}
