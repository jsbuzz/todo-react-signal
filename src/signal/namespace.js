import { NameSpace, InitState } from '../../react-signal/event-hive/namespace';
import {
  AddTodo, RemoveTodo, UpdateTodo,
} from './events';

const TodoSpace = NameSpace.get('Ns.Todos');

let todoId = 0;
const setValue = value => () => () => value;

TodoSpace.defineState({
  todos: [
    InitState, setValue(new Map()),
    AddTodo, todos => ({ title }) => {
      const id = ++todoId;
      const todo = { id, title, done: false };

      todos.set(id, todo);

      return todos;
    },
    RemoveTodo, todos => ({ id }) => (todos.delete(id) && todos),
    UpdateTodo, todos => ({ todo }) => (todos.set(todo.id, todo) || todos),
  ],
});

window.TodoSpace = TodoSpace;

export default TodoSpace;
