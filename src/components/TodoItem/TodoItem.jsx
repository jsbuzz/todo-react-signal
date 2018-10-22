import React from 'react';
import PropTypes from 'prop-types';

import { RemoveTodo, ToggleTodo } from '../../signal/events';

const TodoItem = ({ todo: { id, title, done } }, namespace) => (
  <li className={done ? 'todo completed' : 'todo'}>
    <input
      type="checkbox"
      className="toggle"
      onClick={() => namespace().trigger(ToggleTodo.with(id))}
      checked={done ? 'checked' : null}
    />
    <label className="todo-title">{title}</label>
    <button className="destroy"  onClick={() => namespace().trigger(RemoveTodo.with(id))}></button>
  </li>
);
TodoItem.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })),
};

export default TodoItem;
