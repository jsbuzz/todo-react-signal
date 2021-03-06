# todo-react-signal

Example application to develop the prototype of the React-Signal library.

To start you can use either yarn or npm

```
yarn
yarn start
```

or

```
npm install
npm start
```

# React ~ Signal

Signal is an event based state management and component communication library. Its aim is to implement an event based state management system and to trial some ideas around asynchronous component communication.

The idea itself is a marriage between redux and FlightJs. It is meant to be a learning process - a sandbox for new ideas.

Also React ~ Signal can handle async state changes out of the box as all events are async by nature. It offers less boilerplate and more flexibility than Redux, but of course it is easy in the prototype stage.

**Note**
The list style listener setup is quite a niche idea, not 100% yet that it will stay. I found it difficult to define events and their listeners with using the Event class as the key to listen for. And I wanted to avoid chaining lots of functions together to set up all the listeners.
But in its current form it would need rules to integrate better with `prettier` otherwise it gets broken up to separate lines which looks much less readable.

## Namespaces

Namespaces facilitate event triggering and listening. When an event is triggered inside a Namespace, every connected child component that is listening for that particular event will receive it.

Components need to be connected through a `Connect` function very similarly to Redux, although there is no `mapDispatchToProps`.

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

It is currently being worked out if events should bubble up in the Namespace tree. It is possible to catch events and trigger them to the parent namespace by services in the meantime.


## Hooks

The easiest way to interact with the current Namespace is by hooks. These hooks are based on the useContext React hook.

### useNamespace

This hook is providing an interface to the current Namespace. In the first iteration it only returns a trigger function that can be safely used to trigger any event inside the current NameSpace with the debugger properly tracing the event back to the Component.

```
const NewTodo = () => {
  const { trigger } = useNamespace();

  return (
    <input
      placeholder="What needs to be done?"
      className="new-todo"
      onKeyUp={({ currentTarget, keyCode }) => {
        if (keyCode === 13 && currentTarget.value.length) {
          trigger(AddTodo.with(currentTarget.value));
          currentTarget.value = "";
        } else if (keyCode === 27) {
          currentTarget.value = "";
        }
      }}
    />
  );
};
 ```



### useListeners

Based on the React useEffect hook *useListeners* will set event listeners on the current NameSpace and call the provided function when those events trigger.

```
export const LastOperation = () => {
  const [state, setState] = useState({});
  const setOperation = operation => setState({ operation });

  useListeners(
    AddTodo,
    ({ title }) => setOperation(`Added: "${title}"`),

    RemoveTodo,
    ({ id }) => setOperation(`Removed: #${id}`),

    UpdateTodo,
    ({ todo: { id, done } }) => setOperation(`Updated: #${id}: ${done ? "done" : "active"}`),

    RestoreTodos,
    ({ savedTodos }) => setOperation(`Restored ${savedTodos.length} items from cache`)
  );
  
  return (
    <span>
      Last operation: <strong>{state.operation}</strong>
    </span>
  );
};
```

## Services

Services are like components that have no UI element. They only interact through events. They listen to events and fire events. In the first implementation they are classes that extend the **Service** base class from react-signal. But they could be ported to simple functions later if necessary.

Example: [StateGuard Service](https://github.com/jsbuzz/todo-react-signal/blob/master/src/services/StateGuard.js)

The signature is the following

### listen

This function will be called when the service is connected to the NameSpace. It is only called once on startup and sets up all the listeners. It is done in a way that Services will have priority and access the events before any of the components do. In case we want to cancel an event before it gets to the components. Although it is worth noting that the Services will receive the events after the State engine, so state changes connected to an event cannot be avoided.

### destructor

The destructor will be called when the Service is disconnected from the NameSpace, in case any further cleanup steps are needed.


## Connected components

Components can also be connected to be able to access the namespace in the component tree. The `Connect` function can be used for both functional and class components. It has two main responsibilities, provides access to the Namespace and can also connect the props to the Namespace state.

Example for using the namespace to trigger events:

```
import Connect from 'react-signal';

const DeleteButton = ({ id }, namespace) => (
  <button onClick={() => namespace().trigger(RemoveTodo.with(id))}/>
    X
   </button>
);

export default Connect(DeleteButton);
```

The `namespace` parameter after the props is passed in by the connector. It has to be used as a function for now as this was the best way to make the underlying system operate better tracking and logging all opreations.

Example for connecting props to the state:
```
const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {mapTodos(todos, todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
  
export default Connect(TodoList, ({ todos }) => ({ todos }));
```

Here the connector will generate a StateConnector wrapper that is listening to changes on the Namespace's state. The second parameter is the mapStateToProps equivalent, but trialing an optimisation where the StateConnector will only re-render if any of the listed props have changed in the state. Redux is triggering a re-render on all connected components every time anything changes in the state. This would always trigger a Virtual DOM re-render as well for all functional components.

## Events

Events are typechecked and are much more defined than redux actions or FlightJS events. Event data is also immutable by default to avoid problems when some listeners would cause errors by updating the event data for all the others.

Events are identified by a name, which will be used by the namespaces to set listeners for. When an event is triggered a new instance is made that will be sent to all the listener functions inside the Namespace.

```
const AddTodoEvent = defineEventType({
  title: String
});

export const AddTodo = AddTodoEvent.withAlias('Todo:add');
```

Similarly to propTypes for React Components events will have typed properties but they will throw runtime exceptions if initiated with the wrong payload.

## State

State management is essential to React applications. Redux is a great library for this and Signal is not meant to replace it - it is using lots of core ideas from the Flux flow and Redux.

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
