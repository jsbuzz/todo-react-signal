import Service from '../../react-signal/Service';
import { StateChanged } from '../../react-signal/event-hive/namespace';
import { RestoreTodos } from '../signal/events';

export const STORE_KEY = id => `state-guard:todos:${id}`;

class StateGuard extends Service {
  listen() {
    this.restoreTodos();

    this.namespace().listen(StateChanged, () => this.saveState());
  }

  saveState() {
    const todos = this.namespace().state.todos;
    const todosToSave = [];
    for (const todo of todos.values()) {
      todosToSave.push(todo);
    }
    localStorage.setItem(STORE_KEY(this.namespace().id), JSON.stringify(todosToSave));
  }

  restoreTodos() {
    const savedStateJSON = localStorage.getItem(STORE_KEY(this.namespace().id));

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
