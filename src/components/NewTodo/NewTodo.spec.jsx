import React from 'react';
import { shallow } from 'enzyme';
import Connect, { TestNameSpace } from '../../../react-signal/test-connect';

import { AddTodo } from '../../signal/events';
import NewTodo from './NewTodo';

describe('components/NewTodo', () => {
  let NS;
  let component;

  beforeEach(() => {
    NS = new TestNameSpace();
    const ConnectedComponent = Connect(NewTodo, NS);
    component = shallow(<ConnectedComponent />);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  describe('WHEN enter is pressed', () => {
    describe('AND there is NO title set', () => {
      it('should NOT trigger any event', async () => {
        const input = component.find('input');
        input.simulate('keyUp', { keyCode: 13, currentTarget: { value: '' }});

        expect(NS.lastEvent).toBe(null);
      });
    });

    describe('AND there is a title set', () => {
      const todoTitle = 'Test Title';

      it('should trigger AddTodo with the correct title', () => {
        const input = component.find('input');
        const currentTarget = { value: todoTitle };
        input.simulate('keyUp', { keyCode: 13, currentTarget });

        expect(NS.lastEvent).toBeInstanceOf(AddTodo);
        expect(NS.lastEvent.title).toEqual(todoTitle);
      });
    });
  });
});