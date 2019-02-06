import Service from '../../react-signal/Service';
import { StateChanged } from '../../react-signal/event-hive/namespace';
import { UpdateActive } from '../signal/events';

class AppBridge extends Service {
  listen() {
    this.namespace().listen(StateChanged, () => this.updateActive());
  }

  updateActive() {
    const todos = this.namespace().state.todos;
    let active = 0;
    for (const todo of todos.values()) {
      active += todo.done ? 0 : 1;
    }
    this.parent().trigger(UpdateActive.with(active));
  }

  name = 'AppBridge';
}

export default AppBridge;
