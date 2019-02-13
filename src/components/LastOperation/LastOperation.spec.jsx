import React from 'react';
import { shallow } from 'enzyme';
import { TestNameSpace } from '../../../react-signal/test-connect';

import { AddTodo } from '../../signal/events';
import { LastOperationListeners, LastOperation } from './LastOperation';

describe('components/LastOperation', () => {
  const target = 'Target';
  let NS;
  let component;

  beforeEach(() => {
    NS = new TestNameSpace('TargetSpace');
    const SignalComponent = NS.addSignal(LastOperationListeners)(LastOperation);
    component = shallow(<SignalComponent target={target} />);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  describe('WHEN AddTodo is triggered', () => {

  });
});