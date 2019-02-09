import React from 'react';
import NameSpace from '../react-signal/NameSpace';

import AppSpace from './signal/AppSpace';

import Summary from './components/Summary';
import TodoApp from './components/TodoApp';

export default () => (
  <NameSpace schema={AppSpace} name="AppSpace" debug={true}>
    <Summary />
    <TodoApp title="Work" />
    <TodoApp title="Home" />
  </NameSpace>
);
