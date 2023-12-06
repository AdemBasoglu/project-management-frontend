import { Board } from './Board';
import { TaskLabel } from '../enums/TaskLabel';

export interface Task {
  id: number;
  name: string;
  description: string;
  createdDate: string;
  label: TaskLabel;
  board: Board;
}
