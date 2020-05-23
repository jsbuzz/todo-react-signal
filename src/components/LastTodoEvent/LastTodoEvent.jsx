import React, { PureComponent } from "react";
import { AllEvents } from "../../../react-signal";
import { useListeners } from "../../../react-signal/hooks";
import { AddTodo } from "../../signal/events";

const isTodoEvent = event => event.name.toLowerCase().includes("todo");

// class LastTodoEventOld extends PureComponent {
//   componentDidMount() {
//     this.namespace().listen(
//       AllEvents,
//       event => isTodoEvent(event) && this.setState({ lastEvent: event.name })
//     );
//   }

//   render() {
//     const { lastEvent } = this.state;

//     return <div>Last event triggered: {lastEvent}</div>;
//   }

//   state = { lastEvent: null };
// }

// export default LastTodoEventOld;

const LastTodoEvent = () => {
  const { state } = useListeners(LastTodoEvent)(setState => [
    AllEvents,
    event => isTodoEvent(event) && setState({ lastEvent: event.name })
  ]);

  return <div>Last event triggered: {state.lastEvent}</div>;
};

export default LastTodoEvent;
