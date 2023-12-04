import { Project } from './Project';
import { Task } from './Task';

export interface Board {
  id: number;
  name: string;
  project: Project;
}
