import React from "react";
import PropTypes from "prop-types";
import { useNamespace } from "../../../react-signal/hooks";

import { RemoveTodo, UpdateTodo } from "../../signal/events";
import CheckBox from "./CheckBox";
import TitleEditor from "./TitleEditor";

const TodoItem = ({ todo }) => {
  const { id, title, done, edited } = todo;
  const { trigger } = useNamespace(TodoItem);

  return (
    <li
      className={`todo${done ? " completed" : ""}${edited ? " edited" : ""}`}
      onDoubleClick={() =>
        trigger(UpdateTodo.with({ id, title, done, edited: true }))
      }
    >
      <CheckBox
        onChange={() =>
          trigger(UpdateTodo.with({ id, title, edited, done: !done }))
        }
        done={done}
      />
      <label className="todo-title">{title}</label>
      {edited && <TitleEditor todo={todo} />}
      <button
        type="button"
        className="destroy"
        onClick={() => trigger(RemoveTodo.with(id))}
      />
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    edited: PropTypes.bool,
    done: PropTypes.bool.isRequired
  }).isRequired
};

export default TodoItem;
