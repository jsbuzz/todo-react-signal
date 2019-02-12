import React from 'react';
import { Signal } from '../react-signal';
import NameSpace from '../react-signal/NameSpace';

import AppSpace from './signal/AppSpace';

import Summary from './components/Summary';
import TodoApp from './components/TodoApp';

import Toggle from './components/Toggle';
import LastTodoEvent from './components/LastTodoEvent';
import LastOperation from './components/LastOperation';

export default () => (
  <NameSpace schema={AppSpace} name="AppSpace" debug={true}>
    <Summary />
    <LastTodoEvent />
    <Toggle name="work" show={true}>
      <LastOperation target="Work" />
    </Toggle>
    <Toggle name="home" show={true}>
      <LastOperation target="Home" />
    </Toggle>
    <TodoApp title="Work" />
    <TodoApp title="Home" />
  </NameSpace>
);
