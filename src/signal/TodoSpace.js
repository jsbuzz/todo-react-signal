import {
  NameSpace,
  InitState,
  set,
  modify
} from '../../react-signal/event-hive/namespace';
import { AddTodo, RemoveTodo, UpdateTodo, RestoreTodos } from './events';

const TodoSpace = NameSpace.schema((todoId = 0) => ({
  todos: [
    InitState, set(new Map()),
    
    // Add new todo
    AddTodo, modify(todos => ({ title }) => {
      const id = ++todoId;
      const todo = { id, title, done: false };

      todos.set(id, todo);
    }),
    
    // restore todos from cache
    RestoreTodos, modify(todos => ({ savedTodos }) => {
      savedTodos.forEach(todo => {
        todoId = todo.id;
        todos.set(todo.id, todo);
      });
    }),
    
    // remove a todo by id
    RemoveTodo, modify(todos => ({ id }) => todos.delete(id)),
    
    // update a todo by id
    UpdateTodo, modify(todos => ({ todo }) => todos.set(todo.id, todo))
  ]
}));

window.TodoSpace = TodoSpace;

export default TodoSpace;
