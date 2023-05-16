import { FaSpinner, FaSearch } from "react-icons/fa";
import { useCallback, useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";

import { createTodo } from "../../api/todo";
import useFocus from "../../hooks/useFocus";
import { IInputTodoProps } from "./InputTodo.types";
import { debounce } from "../../utils";
import { getSearch } from "../../api/search";
import AutoComplete from "../AutoComplete";

const InputTodo = ({ setTodos }: IInputTodoProps) => {
  const textRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      try {
        event.preventDefault();
        setIsLoading(true);

        const trimmed = textRef.current.trim();
        if (!trimmed) {
          return alert("Please write something");
        }

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos(prev => [...prev, data]);
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      } finally {
        if (ref.current) {
          textRef.current = "";
          ref.current.value = "";
        }
        setIsLoading(false);
      }
    },
    [textRef, ref, setTodos]
  );

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    textRef.current = event.target.value;
    const response = await getSearch(event.target.value);
    setAutoCompleteList(response?.data.result);
    setIsVisible(true);
  };

  const onChangeDebounce = debounce(handleSearch);

  return (
    <div className="form-wrapper">
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="search-image-wrapper">
          <FaSearch className="search-image" />
        </div>
        <input
          className="input-text"
          placeholder="Add new todo..."
          ref={ref}
          onChange={onChangeDebounce}
          disabled={isLoading}
        />
        {!isLoading ? <div className="blank"></div> : <FaSpinner className="spinner" />}
      </form>
      <AutoComplete
        autoCompleteList={autoCompleteList}
        setAutoCompleteList={setAutoCompleteList}
        textRef={textRef}
        handleSubmit={handleSubmit}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </div>
  );
};

export default InputTodo;
