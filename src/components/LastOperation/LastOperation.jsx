import React, { useState } from "react";
import {
  AddTodo,
  RemoveTodo,
  UpdateTodo,
  RestoreTodos
} from "../../signal/events";
import { useListeners } from "../../../react-signal/hooks";

export const LastOperation = ({ target }) => {
  const isTarget = ns => ns.name.includes(target);

  const [state, setState] = useState({});
  const setOperation = operation => setState({ operation });

  useListeners(LastOperation)(
    AddTodo,
    ({ title, _origin }) =>
      isTarget(_origin) && setOperation(`Added: "${title}"`),

    RemoveTodo,
    ({ id, _origin }) => isTarget(_origin) && setOperation(`Removed: #${id}`),

    UpdateTodo,
    ({ todo: { id, done }, _origin }) =>
      isTarget(_origin) &&
      setOperation(`Updated: #${id}: ${done ? "done" : "active"}`),

    RestoreTodos,
    ({ savedTodos, _origin }) =>
      isTarget(_origin) &&
      setOperation(`Restored ${savedTodos.length} items from cache`)
  );
  return (
    <span>
      Last operation on {target}: <strong>{state.operation}</strong>
    </span>
  );
};
