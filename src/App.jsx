import React from 'react';
import NameSpace from '../react-signal/NameSpace';

import AppSpace from './signal/AppSpace';

import Summary from './components/Summary';
import TodoApp from './components/TodoApp';
import LastTodoEvent, { LastTodoEventSignal } from './components/LastTodoEvent';

export default () => (
  <NameSpace schema={AppSpace} name="AppSpace" debug={true}>
    <Summary />
    <LastTodoEvent />
    <LastTodoEventSignal />
    <TodoApp title="Work" />
    <TodoApp title="Home" />
  </NameSpace>
);
