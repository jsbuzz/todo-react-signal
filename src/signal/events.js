import { Event } from '../../react-signal/event-hive/event';

export const AddTodoEvent = class extends Event {
  constructor(title) {
    super();
    this.title = title;
  }
};
export const IdEvent = class extends Event {
  constructor(id) {
    super();
    this.id = id;
  }
};

export const ErrorEvent = class extends Event {
  constructor(error) {
    super();
    this.error = error;
  }
};

export const AddTodo = AddTodoEvent.withAlias('Todo:add');
export const RemoveTodo = IdEvent.withAlias('Todo:remove');
export const ToggleTodo = IdEvent.withAlias('Todo:toggle');
