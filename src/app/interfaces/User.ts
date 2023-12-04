import { Project } from './Project';
import { Task } from './Task';

export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  projects: Project[];
  tasks: Task[];
}
