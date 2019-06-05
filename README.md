# todo-react-signal

Example application to develop the prototype of the React-Signal library.

# React ~ Signal

Signal is an event based state management and component communication library. Its aim is to implement an event based state management system and to trial some ideas around asynchronous component communication.

The idea itself is a marriage between redux and FlightJs. It is meant to be a learning process - a sandbox for new ideas.

## Namespaces

Namespaces facilitate event triggering and listening. When an event is triggered inside a Namespace, every child component that is listening for that particular event will receive it.

Namespaces can run services that are similar to data components - they have no UI but can interact with the UI components through events. Typically services will fetch or post data to APIs or act as bridges to parent Namespaces. 

```
export default ({ title }) => (
  <>
    <h1>{title}</h1>
    <NameSpace
      schema={TodoSpace}
      name={`${title}Space`}
      services={[StateGuard, AppBridge]}
    >
      <section className="todoapp">
        <header className="header">
          <NewTodo />
        </header>
        <TodoList />
      </section>
    </NameSpace>
  </>
);
```

It is currently being worked out if events should bounce up in the Namespace tree. It is possible to catch events and trigger them to the parent namespace by services in the meantime.


## Events

Events are strongly typed and much more defined than redux actions or FlightJS events. Event data is also immutable by default to avoid problems when some listeners would cause errors by updating the event data for all the others.

Events are identified by a name, which will be used by the namespaces to set listeners for. When an event is triggered a new instance is made that will be sent to all the listener functions inside the Namespace.

```
export const AddTodoEvent = defineEventType({
  title: String
});
```

Similarly to propTypes for React Components events will have typed properties but they will throw runtime exceptions if initiated with the wrong payload.

## State

State management is essential to React applications. Redux is a great library for this and Signal is not meant to replace that - it is using lots of core ideas from the Flux flow and Redux.

When a namespace schema is defined, it comes with a state definition. State definitions are a list of properties inside the state, each defined as a set of listener functions similar to redux's reducers. At this stage it is not decided that reducers have to always generate a new state.

The state is read-only from the outside, the only way to change it is through the events defined in the schema.

```
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
```
In the above example there are two basic operation types, `set` and `modify`. Set will always return the given value when the event is triggered. So the `InitState, set(new Map())` tuple means that every time `InitState` is triggered on the Namespace, the value of `todos` is going to be overwritten by a new Map instance.

`modify` on the other hand is re-using the current value of the property and returns the same instance with the modified value.

## Testing

Testability is seential to our applications so Signal is developed with this in mind. Components can be tested independently with TestNameSpace instances that can be observed and asserted easily in order to help writing readable and simple unit tests.

Good examples can be found for
- [TodoSpace](https://github.com/jsbuzz/todo-react-signal/blob/master/src/signal/TodoSpace.spec.js)
- [TodoItem](https://github.com/jsbuzz/todo-react-signal/blob/master/src/components/TodoItem/TodoItem.spec.jsx)
- [NewTodo](https://github.com/jsbuzz/todo-react-signal/blob/master/src/components/NewTodo/NewTodo.spec.jsx)

## Debugging

React Signal is also built to be easily debuggable. Debug can be switched on for development and it will log every event trigger and what listeners were called from which component.

![debug screenshot from console](https://github.com/jsbuzz/todo-react-signal/blob/master/images/Debug%20Screen%20Shot.png)
