import React from 'react';
import NameSpace from '../../react-signal/NameSpace';

import TodoSpace from '../signal/TodoSpace';

import NewTodo from './NewTodo';
import TodoList from './TodoList';

import StateGuard from '../services/StateGuard';
import AppBridge from '../services/AppBridge';

export default ({ title }) => (
  <>
    <h1>{title}</h1>
    <NameSpace
      schema={TodoSpace}
      name={`${title}Space`}
      services={[StateGuard, AppBridge]}
      debug={true}
    >
      <section className="todoapp">
        <header className="header">
          <NewTodo />
        </header>
        <TodoList />
      </section>
    </NameSpace>
  </>
);
