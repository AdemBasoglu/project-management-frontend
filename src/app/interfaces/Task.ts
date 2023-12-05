import { Board } from './Board';
import { TaskLabel } from '../enums/TaskLabel';

export interface Task {
  id: number;
  name: string;
  description: string;
  // createdDate: Date;
  label: TaskLabel;
  board: Board;
}
