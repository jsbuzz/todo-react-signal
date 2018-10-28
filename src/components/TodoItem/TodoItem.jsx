import React from 'react';
import PropTypes from 'prop-types';

import { RemoveTodo, UpdateTodo } from '../../signal/events';
import CheckBox from './CheckBox';
import TitleEditor from './TitleEditor';

/* eslint jsx-a11y/label-has-associated-control: 0 */
/* eslint jsx-a11y/label-has-for: 0 */
const TodoItem = ({ todo }, ns) => {
  const { id, title, done, edited } = todo;
  return (
    <li
      className={(done ? 'todo completed' : 'todo') + (edited ? ' edited' : '')}
      onDoubleClick={() => ns().trigger(UpdateTodo.with({ id, title, done, edited: true }))}
    >
      <CheckBox
        onChange={() => ns().trigger(UpdateTodo.with({ id, title, done: !done }))}
        done={done}
      />
      <label className="todo-title">{title}</label>
      {edited && <TitleEditor todo={todo} />}
      <button
        type="button"
        className="destroy"
        onClick={() => ns().trigger(RemoveTodo.with(id))}
      >
      </button>
    </li>
  );
};


TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
