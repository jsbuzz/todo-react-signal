import React, { useState } from "react";
import { AllEvents } from "../../../react-signal";
import { useListeners } from "../../../react-signal/hooks";

const isTodoEvent = event => event.name.toLowerCase().includes("todo");

const LastTodoEvent = () => {
  const [state, setState] = useState({ lastEvent: "-" });
  useListeners(
    AllEvents,
    event => isTodoEvent(event) && setState({ lastEvent: event.name })
  );

  return <div>Last event triggered: {state.lastEvent}</div>;
};

export default LastTodoEvent;
