import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from '../TodoItem';

const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
);
TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  })),
};

export default TodoList;
