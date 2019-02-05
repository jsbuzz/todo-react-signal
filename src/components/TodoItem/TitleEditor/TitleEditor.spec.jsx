import React from 'react';
import { shallow } from 'enzyme';
import Connect, { TestNameSpace } from '../../../../react-signal/test-connect';

import { UpdateTodo } from '../../../signal/events';
import TitleEditor from './TitleEditor';

describe('components/TitleEditor', () => {
  const todo = {
    id: 191,
    title: 'test me!',
    done: false,
    edited: true
  };
  let NS;
  let component;

  beforeEach(() => {
    NS = new TestNameSpace();
    const ConnectedComponent = Connect(TitleEditor, NS);
    component = shallow(<ConnectedComponent todo={todo} />);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  describe('WHEN `Enter` key is pressed', () => {
    beforeEach(() => {
      component.setState({ value: '' });
      component.find('input').simulate('keyUp', { keyCode: 13 });
    });

    describe('AND current value is empty', () => {
      it('should NOT trigger UpdateTodo', () => {
        expect(NS.lastEvent).toBe(null);
      });
    });

    describe('AND current value is NOT empty', () => {
      const newTitle = 'The new title';

      beforeEach(() => {
        component.setState({ value: newTitle });
        component.find('input').simulate('keyUp', { keyCode: 13 });
      });

      it('should trigger UpdateTodo', () => {
        expect(NS.lastEvent).toBeInstanceOf(UpdateTodo);
        expect(NS.lastEvent.todo).toEqual({
          ...todo,
          edited: false,
          title: newTitle
        });
      });
    });
  });

  describe('WHEN `Esc` key is pressed', () => {
    const newTitle = 'The new title';

    beforeEach(() => {
      component.setState({ value: newTitle });
      component.find('input').simulate('keyUp', { keyCode: 27 });
    });

    it('should trigger UpdateTodo with edited: false and original title', () => {
      expect(NS.lastEvent).toBeInstanceOf(UpdateTodo);
      expect(NS.lastEvent.todo).toEqual({
        ...todo,
        edited: false
      });
    });
  });

  describe('WHEN input loses focus', () => {
    const newTitle = 'The new title';

    beforeEach(() => {
      component.setState({ value: newTitle });
      component.find('input').simulate('blur');
    });

    it('should trigger UpdateTodo with edited: false and original title', () => {
      expect(NS.lastEvent).toBeInstanceOf(UpdateTodo);
      expect(NS.lastEvent.todo).toEqual({
        ...todo,
        edited: false
      });
    });
  });
});
