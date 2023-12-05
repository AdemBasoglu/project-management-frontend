import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { TaskLabel } from '../../enums/TaskLabel';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'pm-task',
  standalone: true,
  imports: [CdkDrag, DragDropModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task: Task = {
    id: 0,
    name: '',
    description: '',
    // createdDate: Date.now().toFixed(),
    label: TaskLabel.DEFAULT,
    board: {
      id: 0,
      name: '',
      project: {
        id: 0,
        name: '',
      },
    },
  };
  constructor() {}
}
