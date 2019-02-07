import React from 'react';
import NameSpaceContext from '../react-signal/NameSpaceContext';

import AppSpace from './signal/AppSpace';

import Summary from './components/Summary';
import TodoApp from './components/TodoApp';

export default () => (
  <NameSpaceContext schema={AppSpace} name="AppSpace">
    <Summary />
    <TodoApp title="Work" />
    <TodoApp title="Home" />
  </NameSpaceContext>
);
