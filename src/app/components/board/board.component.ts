import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { Board } from '../../interfaces/Board';

@Component({
  selector: 'pm-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  @Input() board: Board = {
    id: 0,
    name: '',
    project: {
      id: 0,
      name: '',
    },
  };
  tasks: Task[] = [];

  constructor() {}

  ngOnInit(): void {
    // console.log(this.board);
  }
}
