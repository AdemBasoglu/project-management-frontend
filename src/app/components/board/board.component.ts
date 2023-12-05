import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { Board } from '../../interfaces/Board';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../services/task.service';
import {
  CdkDragDrop,
  CdkDropList,
  transferArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'pm-board',
  standalone: true,
  imports: [TaskComponent, CdkDropList],
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

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // console.log(this.board);
    this.taskService.getTaskByBoardId(this.board.id).subscribe({
      next: (tasks) => {
        (this.tasks = tasks), console.log('TASKS: ' + this.tasks);
      },
      error: (err) => console.log(err),
    });
  }
  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
