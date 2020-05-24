import {
  NameSpace,
  InitState,
  set,
  modify
} from "../../react-signal/event-hive/namespace";
import { AddTodo, RemoveTodo, UpdateTodo, RestoreTodos } from "./events";

const TodoSpace = NameSpace.schema((todoId = 0) => ({
  todos: [
    InitState,
    set(new Map()),

    // Add new todo
    AddTodo,
    modify(todos => ({ title }) => {
      const id = ++todoId;
      const todo = { id, title, done: false };

      todos.set(id, todo);
    }),

    // restore todos from cache
    RestoreTodos,
    modify(todos => ({ savedTodos }) => {
      savedTodos.forEach(todo => {
        todoId = todo.id;
        todos.set(todo.id, todo);
      });
    }),

    // remove a todo by id
    RemoveTodo,
    modify(todos => ({ id }) => todos.delete(id)),

    // update a todo by id
    UpdateTodo,
    modify(todos => ({ todo }) => todos.set(todo.id, todo))
  ]
}));

function EventReducer() {
  this.listen = () => this;
}

const todosReducer = new EventReducer()
  .listen(RestoreTodos, ({ todos }) => ({ savedTodos }) => {
    savedTodos.forEach(todo => {
      _todoId = todo.id;
      todos.set(todo.id, todo);
    });

    return todos;
  })
  .listen(AddTodo, ({ todos }) => ({ title }) => {
    const id = ++_todoId;
    const todo = { id, title, done: false };

    todos.set(id, todo);

    return todos;
  });

const TodoSpace2 = NameSpace.schema2({
  todos: todosReducer,
  todoCount: 0,
  _todoId: 0
})
  .addReducer(
    RestoreTodos,
    ({ todos, todoCount, _todoId, ...state }) => ({ savedTodos }) => {
      savedTodos.forEach(todo => {
        _todoId = todo.id;
        todos.set(todo.id, todo);
      });

      todoCount += savedTodos.length;

      return { ...state, todos, todoCount, _todoId };
    }
  )
  .addReducer(
    AddTodo,
    ({ todos, todoCount, _todoId, ...state }) => ({ title }) => {
      const id = ++_todoId;
      const todo = { id, title, done: false };

      todos.set(id, todo);

      todoCount += 1;

      return { ...state, todos, todoCount, _todoId };
    }
  )
  .addReducer(RemoveTodo, ({ todos, todoCount, ...state }) => ({ id }) => {
    todos.delete(id);
    todoCount -= 1;

    return { ...state, todos, todoCount };
  })
  .addReducer(UpdateTodo, ({ todos, ...state }) => ({ todo }) => {
    todos.set(todo.id, todo);

    return { ...state, todos };
  });

window.TodoSpace = TodoSpace;

export default TodoSpace;
