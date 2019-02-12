import React from 'react';
import { basicEvent } from '../../../react-signal/event-hive/event';

export const ToggleEvent = name => basicEvent(`Toggle:${name}`);

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
