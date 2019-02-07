import Service from '../../react-signal/Service';
import { StateChanged } from '../../react-signal/event-hive/namespace';
import { UpdateActive } from '../signal/events';

class AppBridge extends Service {
  listen() {
    this.active = 0;
    this.namespace().listen(StateChanged, () => this.updateActive());
  }

  updateActive() {
    const todos = this.namespace().state.todos;
    let active = 0;
    for (const todo of todos.values()) {
      active += todo.done ? 0 : 1;
    }
    this.namespace()
      .parent()
      .trigger(UpdateActive.with(active - this.active));
    this.active = active;
  }
}

export default AppBridge;
