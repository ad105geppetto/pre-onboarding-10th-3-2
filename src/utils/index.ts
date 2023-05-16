import { ChangeEvent } from "react";
import { Callback } from "./index.types";

export const debounce = (callback: Callback) => {
  let timeout: number | undefined;

  return (event: ChangeEvent<HTMLInputElement>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = window.setTimeout(() => {
      callback(event);
    }, 500);
  };
};
