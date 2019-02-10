import React from 'react';
import { AddTodo, RemoveTodo, UpdateTodo, RestoreTodos } from '../../signal/events';

export const LastOperationRenderer = ({ operation }) => (
  <div>Last operation: <strong>{operation}</strong></div>
);

export const LastOperationListeners = setProps => [
  AddTodo, ({ title }) => setProps({ operation: `Added: ${title}`}),
  RemoveTodo, ({ id }) => setProps({ operation: `Removed: #${id}`}),
  UpdateTodo, ({ todo: {id, done} }) => setProps({
    operation: `Updated: #${id}: ${ done ? 'done' : 'active'}`
  }),
  RestoreTodos, ({ savedTodos }) => setProps({
    operation: `Restored ${savedTodos.length} items from cache`
  })
];
