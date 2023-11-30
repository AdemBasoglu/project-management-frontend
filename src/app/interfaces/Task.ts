import {User} from "./User";
import {Board} from "./Board";

export interface Task {
  id: number,
  name: string,
  description: string,
  createdDate: string,
  //Label : taskLabel
  board: Board
  user: User
}
