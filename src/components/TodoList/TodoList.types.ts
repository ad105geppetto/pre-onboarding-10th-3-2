import { Dispatch, SetStateAction } from "react";

type Todo = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export interface ITodoListProps {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}
