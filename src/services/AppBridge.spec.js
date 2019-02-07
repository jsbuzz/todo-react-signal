import AppBridge, { STORE_KEY } from './AppBridge';
import { TestNameSpace } from '../../react-signal/test-connect';
import { StateChanged } from '../../react-signal/event-hive/namespace';
import TodoSpace from '../signal/TodoSpace';
import AppSpace from '../signal/AppSpace';
import {
  AddTodo,
  UpdateActive,
  RestoreTodos,
  RemoveTodo
} from '../signal/events';

describe('services/AppBridge', () => {
  const todo1 = { id: 3, title: 'add service', done: true };
  const todo2 = { id: 9, title: 'add tests', done: false };
  const mockTodos = [todo1, todo2];

  let service;
  let parentNS;
  let NS;

  beforeEach(async () => {
    parentNS = new TestNameSpace('AppSpace', AppSpace);
    NS = new TestNameSpace('TodoSpace', TodoSpace, parentNS);

    service = NS.startService(AppBridge);
    await NS.trigger(RestoreTodos.with(mockTodos));
    await NS.updatingState;
  });

  it('starts with 1 active todo', () => {
    expect(service.active).toBe(1);
  });

  describe('WHEN number of active todos increases', () => {
    beforeEach(async () => {
      await NS.trigger(AddTodo.with('test title'));
      await NS.updatingState;
    });

    it('triggers UpdateActive with the difference (+1)', () => {
      expect(parentNS.lastEvent).toBeInstanceOf(UpdateActive);
      expect(parentNS.lastEvent.active).toEqual(1);
    });
  });

  describe('WHEN number of active todos decreases', () => {
    beforeEach(async () => {
      await NS.trigger(RemoveTodo.with(9));
      await NS.updatingState;
    });

    it('triggers UpdateActive with the difference (-1)', () => {
      expect(parentNS.lastEvent).toBeInstanceOf(UpdateActive);
      expect(parentNS.lastEvent.active).toEqual(-1);
    });
  });

  describe('WHEN number of active todos stays the same', () => {
    beforeEach(async () => {
      await NS.trigger(RemoveTodo.with(3));
      await NS.updatingState;
    });

    it('triggers UpdateActive with the difference (0)', () => {
      expect(parentNS.lastEvent).toBeInstanceOf(UpdateActive);
      expect(parentNS.lastEvent.active).toEqual(0);
    });
  });
});
