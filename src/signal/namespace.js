import { NameSpace, InitState, setValue } from '../../react-signal/event-hive/namespace';
import {
  AddTodo, RemoveTodo, UpdateTodo,
} from './events';

let todoId = 0;
const TodoSpace = NameSpace.create('Ns.Todos', {
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
