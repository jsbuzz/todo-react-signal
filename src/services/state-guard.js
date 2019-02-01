import { StateChanged } from '../../react-signal/event-hive/namespace';
import { RestoreTodos } from '../signal/events';

const STORE_KEY = 'state-guard:todos';

class StateGuard {
  listen() {
    console.log('StateGuard:listen');

    this.restoreTodos();

    this.namespace().listen(StateChanged, () => this.saveState());
  }

  saveState() {
    const todos = this.namespace().state.todos;
    const todosToSave = [];
    for (const todo of todos.values()) {
      todosToSave.push(todo);
    }
    localStorage.setItem(STORE_KEY, JSON.stringify(todosToSave));
  }

  restoreTodos() {
    const savedStateJSON = localStorage.getItem(STORE_KEY);

    if (!savedStateJSON) return;

    const savedTodos = JSON.parse(savedStateJSON);
    this.namespace().trigger(RestoreTodos.with(savedTodos));
  }

  destructor() {
    console.log('StateGuard:destructor');
  }

  name = 'StateGuard';
}

export default StateGuard;
