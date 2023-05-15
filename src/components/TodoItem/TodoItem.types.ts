import { Dispatch, SetStateAction } from "react";

type Todo = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export interface ITodoItemProps {
  id: string;
  title: string;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}
