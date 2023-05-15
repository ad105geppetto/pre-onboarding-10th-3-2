import { Dispatch, SetStateAction } from "react";

type Todo = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export interface IInputTodoProps {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}
