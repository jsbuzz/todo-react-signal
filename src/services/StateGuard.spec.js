import StateGuard, { STORE_KEY } from './StateGuard';
import { TestNameSpace } from '../../react-signal/test-connect';
import { StateChanged } from '../../react-signal/event-hive/namespace';
import { RestoreTodos } from '../signal/events';

describe('services/StateGuard', () => {
  const todo1 = { id: 3, title: "add service", done: true};
  const todo2 = { id: 9, title: "add tests", done: false};
  const mockTodos = [ todo1, todo2 ];
  let NS;

  beforeEach(() => {
    NS = new TestNameSpace();
  });

  describe('when there are items stored in localStorage', () => {
    beforeEach(() => {
      localStorage.setItem(STORE_KEY, JSON.stringify(mockTodos));
      NS.startService(StateGuard);
    });

    it('triggers RestoreTodos with the saved todos', () => {
      expect(NS.lastEvent).toBeInstanceOf(RestoreTodos);
      expect(NS.lastEvent.savedTodos).toEqual(mockTodos);
    });
  });
  
  describe('when there are NO items stored in localStorage', () => {
    beforeEach(() => {
      localStorage.removeItem(STORE_KEY);
      NS.startService(StateGuard);
    });

    it('does NOT trigger RestoreTodos', () => {
      expect(NS.lastEvent).toBe(null);
    });
  });

  describe('When StateChanged event is triggered', () => {
    let service;

    beforeEach(() => {
      NS.state = { todos: new Map() };
      NS.state.todos.set(todo1.id, todo1);
      NS.state.todos.set(todo2.id, todo2);

      expect(NS.hasListenerFor(StateChanged)).toBe(false);
      service = NS.startService(StateGuard);
      expect(NS.hasListenerFor(StateChanged)).toBe(true);
    });

    it('listents for StateChanged event and calls saveState()', async () => {
      service.saveState = jest.fn();
      await NS.trigger(StateChanged);
      
      expect(service.saveState).toBeCalled();
    });

    it('saves state to localStorage', async () => {
      localStorage.removeItem(STORE_KEY);

      await NS.trigger(StateChanged);
      
      expect(
        localStorage.getItem(STORE_KEY)
      ).toEqual(
        JSON.stringify(mockTodos)
      );
    });
  });
});
