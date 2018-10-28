import React from 'react';
import TodoItem from '../TodoItem';

const mapTodos = (todos, fn) => {
  const values = [];
  for (const todo of todos.values()) {
    values.push(fn(todo));
  }

  return values;
};

const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {mapTodos(todos, todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
);

export default TodoList;
