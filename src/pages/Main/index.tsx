import { useEffect, useState } from "react";

import Header from "../../components/Header";
import InputTodo from "../../components/InputTodo";
import TodoList from "../../components/TodoList";
import { getTodoList } from "../../api/todo";
import { Todo } from "./Main.types";

const Main = () => {
  const [todoListData, setTodoListData] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo setTodos={setTodoListData} />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
