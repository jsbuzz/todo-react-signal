import React from "react";
import { basicEvent } from "../../../react-signal/event-hive/event";

const ToggleEvent = name => basicEvent(`Toggle:${name}`);

export const Toggle = ({ show, children, name }, ns) => (
  <div>
    <input
      type="checkbox"
      checked={show}
      onChange={() => ns().trigger(ToggleEvent(name))}
    />
    {show && children}
  </div>
);

export const ToggleListener = (get, set) => [
  ToggleEvent(get("name")),
  () => set({ show: !get("show") })
];
