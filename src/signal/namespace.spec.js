import { InitState } from '../../react-signal/event-hive/namespace';
import TodoSpace from './namespace';
import { AddTodo, RemoveTodo, UpdateTodo, RestoreTodos } from './events';

describe('signal/TodoSpace', () => {
  const mockTodo = id => ({
    id,
    title: `title for ${id}`,
    done: false
  });

  beforeEach(() => {
    // resets the state every time
    TodoSpace.triggerSync(InitState);
  });

  it('starts with empty todos Map', () => {
    expect(TodoSpace.state.todos.size).toEqual(0);
  });

  describe('When AddTodo is triggered', () => {
    it('inserts new todos with incremental id and done:false', async () => {
      const testTitle1 = 'testing 1-2-3';
      const testTitle2 = 'testing 3-2-1';

      await TodoSpace.trigger(AddTodo.with(testTitle1));
      expect(TodoSpace.state.todos.size).toEqual(1);
      expect(TodoSpace.state.todos.get(1).title).toEqual(testTitle1);
      expect(TodoSpace.state.todos.get(1).done).toEqual(false);

      await TodoSpace.trigger(AddTodo.with(testTitle2));
      expect(TodoSpace.state.todos.size).toEqual(2);
      expect(TodoSpace.state.todos.get(2).title).toEqual(testTitle2);
      expect(TodoSpace.state.todos.get(2).done).toEqual(false);
    });
  });

  describe('When RestoreTodos is triggered', () => {
    const savedTodos = [mockTodo(1), mockTodo(99)];

    beforeEach(async () => {
      await TodoSpace.trigger(RestoreTodos.with(savedTodos));
    });

    it('inserts todos with stored ids', () => {
      expect(TodoSpace.state.todos.get(1)).toEqual(savedTodos[0]);
      expect(TodoSpace.state.todos.get(99)).toEqual(savedTodos[1]);
    });

    it('uses last id as new max', async () => {
      const testTitle = 'testing 1-2-3';

      await TodoSpace.trigger(AddTodo.with(testTitle));

      expect(TodoSpace.state.todos.get(100).title).toEqual(testTitle);
    });
  });

  describe('When RemoveTodo is triggered', () => {
    const id2remove = 111;
    const savedTodos = [mockTodo(id2remove)];

    beforeEach(async () => {
      await TodoSpace.trigger(RestoreTodos.with(savedTodos));
    });

    it('removes todo at the given id', async () => {
      expect(TodoSpace.state.todos.has(id2remove)).toBe(true);
      await TodoSpace.trigger(RemoveTodo.with(id2remove));
      expect(TodoSpace.state.todos.has(id2remove)).toBe(false);
    });
  });

  describe('When UpdateTodo is triggered', () => {
    const id2update = 999;
    const savedTodos = [mockTodo(id2update)];

    beforeEach(async () => {
      await TodoSpace.trigger(RestoreTodos.with(savedTodos));
    });

    it('updates todo at the given id', async () => {
      expect(TodoSpace.state.todos.get(id2update).done).toBe(false);
      await TodoSpace.trigger(
        UpdateTodo.with({
          ...mockTodo(id2update),
          done: true
        })
      );
      expect(TodoSpace.state.todos.get(id2update).done).toBe(true);
    });
  });
});

function findTodo(todoMap, title) {
  for (const todo of todoMap.values()) {
    if (todo.title === title) {
      return todo;
    }
  }
  return false;
}
