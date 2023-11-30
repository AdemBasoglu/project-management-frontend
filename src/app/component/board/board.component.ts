import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  tasks: any[] = [
    {title: 'Task 1', description: 'Description for Task 1', status: 'In Progress'},
    {title: 'Task 2', description: 'Description for Task 2', status: 'To Do'},
  ];
}
