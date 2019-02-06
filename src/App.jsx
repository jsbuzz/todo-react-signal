import React from 'react';
import NameSpaceContext from '../react-signal/NameSpaceContext';

import TodoSpace from './signal/TodoSpace';
import AppSpace from './signal/AppSpace';

import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';

import StateGuard from './services/StateGuard';
import AppBridge from './services/AppBridge';

export default () => (
  <NameSpaceContext namespace={AppSpace}>
    <h1>Work</h1>
    <NameSpaceContext namespace={TodoSpace} services={[StateGuard, AppBridge]}>
      <section className="todoapp">
        <header className="header">
          <NewTodo />
        </header>
        <TodoList />
      </section>
    </NameSpaceContext>
    
    <h1>Home</h1>
    <NameSpaceContext namespace={TodoSpace} services={[StateGuard, AppBridge]}>
      <section className="todoapp">
        <header className="header">
          <NewTodo />
        </header>
        <TodoList />
      </section>
    </NameSpaceContext>
  </NameSpaceContext>
);
