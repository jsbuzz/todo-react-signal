import React from 'react';
import NameSpace from '../react-signal/NameSpace';

import AppSpace from './signal/AppSpace';

import Summary from './components/Summary';
import TodoApp from './components/TodoApp';
import LastTodoEvent from './components/LastTodoEvent';
import LastOperation from './components/LastOperation';

export default () => (
  <NameSpace schema={AppSpace} name="AppSpace" debug={true}>
    <Summary />
    <LastTodoEvent />
    <LastOperation />
    <TodoApp title="Work" />
    <TodoApp title="Home" />
  </NameSpace>
);
