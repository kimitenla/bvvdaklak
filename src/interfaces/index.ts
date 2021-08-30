export interface ISaga {
  on: any;
  handle: any;
}
export interface IAction {
  type: string;
  payload: any;
}
export interface IDataTodo {
  readonly id: number; // chi cho doc chu ko cho xu ly voi id thi de readonly dang truoc
  title: string;
  isDone: boolean;
  isNote: boolean;
}
