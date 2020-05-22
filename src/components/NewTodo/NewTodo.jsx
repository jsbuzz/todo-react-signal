import React from "react";
import { AddTodo } from "../../signal/events";
import { useNamespace } from "../../../react-signal/hooks";

const NewTodo = _ => {
  const { trigger } = useNamespace(NewTodo);

  return (
    <input
      autoFocus="autofocus"
      autoComplete="off"
      placeholder="What needs to be done?"
      className="new-todo"
      onKeyUp={({ currentTarget, keyCode }) => {
        if (keyCode === 13 && currentTarget.value.length) {
          trigger(AddTodo.with(currentTarget.value));
          currentTarget.value = "";
        }
      }}
    />
  );
};

export default NewTodo;
