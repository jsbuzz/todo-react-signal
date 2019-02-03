import React from 'react';
import { AddTodo } from '../../signal/events';

const NewTodo = (_, namespace) => (
  <input
    autoFocus="autofocus"
    autoComplete="off"
    placeholder="What needs to be done?"
    className="new-todo"
    onKeyUp={keyup => {
      const { currentTarget, keyCode } = keyup;
      if (keyCode === 13 && currentTarget.value.length) {
        namespace().trigger(AddTodo.with(currentTarget.value));
        currentTarget.value = '';
      }
    }}
  />
);

export default NewTodo;
