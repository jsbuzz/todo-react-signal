import React from 'react';
import {
  AddTodo,
  RemoveTodo,
  UpdateTodo,
  RestoreTodos
} from '../../signal/events';

export const LastOperation = ({ operation, target }) => (
  <span>
    Last operation on {target}: <strong>{operation}</strong>
  </span>
);

export const LastOperationListeners = (get, set) => {
  const isTarget = ns => ns.name.includes(get('target'));
  return [
    AddTodo,
    ({ title, _origin }) =>
      isTarget(_origin) && set({ operation: `Added: "${title}"` }),

    RemoveTodo,
    ({ id, _origin }) =>
      isTarget(_origin) && set({ operation: `Removed: #${id}` }),

    UpdateTodo,
    ({ todo: { id, done }, _origin }) =>
      isTarget(_origin) &&
      set({
        operation: `Updated: #${id}: ${done ? 'done' : 'active'}`
      }),

    RestoreTodos,
    ({ savedTodos, _origin }) =>
      isTarget(_origin) &&
      set({
        operation: `Restored ${savedTodos.length} items from cache`
      })
  ];
};
