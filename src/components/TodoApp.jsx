import React from 'react';
import NameSpaceContext from '../../react-signal/NameSpaceContext';

import TodoSpace from '../signal/TodoSpace';

import NewTodo from './NewTodo';
import TodoList from './TodoList';

import StateGuard from '../services/StateGuard';
import AppBridge from '../services/AppBridge';

export default ({ title }) => (
  <>
    <h1>{title}</h1>
    <NameSpaceContext
      schema={TodoSpace}
      name={`${title}Space`}
      services={[StateGuard, AppBridge]}
    >
      <section className="todoapp">
        <header className="header">
          <NewTodo />
        </header>
        <TodoList />
      </section>
    </NameSpaceContext>
  </>
);
