import { useState, useEffect } from "react";
import { getSearch } from "../../api/search";
import { FaSpinner } from "react-icons/fa";
import useFocus from "../../hooks/useFocus";
import { IAutoCompleteProps } from "./AutoComplete.types";

const AutoComplete = (props: IAutoCompleteProps) => {
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const { ref } = useFocus();
  const { textRef, setAutoCompleteList, autoCompleteList } = props;

  // TODO: 무한스크롤 구현
  // auto-complete-list 가 존재하지 않았지만 인풋창에 글 입력시 auto-complete-list가 보이게 됩니다.
  // 하지만 useEffect 내에서 divElement의 값은 여전히 null을 가져와서 무한스크롤 기능을 동작하지 않게 만듭니다.

  useEffect(() => {
    const divElement = document.querySelector(".auto-complete-list") as HTMLDivElement;
    console.log(divElement);
    function handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } = divElement;

      if (scrollHeight - scrollTop <= clientHeight + 10 && !isLoading) {
        setIsLoading(true);
        setTimeout(async () => {
          const newData = await getSearch(textRef.current, page);
          setAutoCompleteList([...autoCompleteList, ...newData.data.result]);
          setIsLoading(false);
        }, 200);
        setPage(prev => prev + 1);
      }
    }

    console.log(divElement);
    window.onload = function () {
      if (divElement) {
        divElement.addEventListener("scroll", handleScroll);
      }
    };

    return () => {
      if (divElement) {
        divElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [textRef, isLoading, setAutoCompleteList, autoCompleteList, page]);

  const onClickAutoComplete = async (event: any, value: string) => {
    if (ref.current) {
      textRef.current = value;
      ref.current.value = "";
      props.setAutoCompleteList([]);
      props.setIsVisible(false);
    }

    props.handleSubmit(event);
  };

  return (
    <>
      {props.isVisible ? (
        <div className="auto-complete-list">
          {props.autoCompleteList.map((autoComplete: string, index: number) => (
            <div
              key={index}
              className="auto-complete"
              onClick={event => onClickAutoComplete(event, autoComplete)}
            >
              {autoComplete
                .replaceAll(textRef.current, `%#$#!${textRef.current}%#$#!`)
                .split(`%#$#!`)
                .map((keyword: string, index: number) =>
                  keyword === textRef.current ? (
                    <span style={{ color: "#2BC9BA" }} key={index}>
                      {keyword}
                    </span>
                  ) : (
                    keyword
                  )
                )}
            </div>
          ))}
          {<FaSpinner className="spinner" />}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AutoComplete;
