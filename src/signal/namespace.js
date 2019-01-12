import { NameSpace, InitState, set, modify } from '../../react-signal/event-hive/namespace';
import {
  AddTodo, RemoveTodo, UpdateTodo,
} from './events';

let todoId = 0;
const TodoSpace = NameSpace.create('Ns.Todos', {
  todos: [
    InitState, set(new Map()),
    AddTodo, modify(todos => ({ title }) => {
      const id = ++todoId;
      const todo = { id, title, done: false };

      todos.set(id, todo);
    }),
    RemoveTodo, modify(todos => ({ id }) => todos.delete(id)),
    UpdateTodo, modify(todos => ({ todo }) => todos.set(todo.id, todo)),
  ],
});

window.TodoSpace = TodoSpace;

export default TodoSpace;
