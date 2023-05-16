import { MutableRefObject, Dispatch, SetStateAction, FormEvent } from "react";

export interface IAutoCompleteProps {
  autoCompleteList: string[];
  setAutoCompleteList: Dispatch<SetStateAction<string[]>>;
  textRef: MutableRefObject<string>;
  handleSubmit: (event: FormEvent) => Promise<void>;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}
