import { NameSpace, InitState } from '../../react-signal/event-hive/namespace';
import { AddTodo, RemoveTodo, ToggleTodo } from './events';

const TodoSpace = NameSpace.get('Ns.Todos');

const findTodo = (todos, todoId) => {
  let i = 0;
  for (const todo of todos) {
    if (todo.id === todoId) {
      return i;
    }
    i += 1;
  }
  return -1;
};

const toggleTodo = (todo) => {
  todo.done = !todo.done;
}

let todoId = 0;
TodoSpace.defineState({
  todos: state => [
    InitState, () => (state.todos = []),
    AddTodo, ({ title }) => (state.todos.push({
      id: ++todoId,
      title,
      done: false,
    })),
    RemoveTodo, ({ id }) => (state.todos.splice(findTodo(state.todos, id), 1)),
    ToggleTodo, ({ id }) => (toggleTodo(state.todos[findTodo(state.todos, id)])),
  ],
});

export default TodoSpace;
