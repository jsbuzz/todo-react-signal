import React from 'react';
import NameSpaceContext from '../react-signal/NameSpaceContext';

import TodoSpace from './signal/namespace';

import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';

export default () => (
  <NameSpaceContext namespace={TodoSpace}>
    <section className="todoapp">
      <header className="header">
        <NewTodo />
      </header>
      <TodoList />
    </section>
  </NameSpaceContext>
);

// 0658940784