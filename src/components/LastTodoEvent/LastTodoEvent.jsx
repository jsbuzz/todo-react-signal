import React, { PureComponent } from 'react';
import { AllEvents } from '../../../react-signal';

class LastTodoEvent extends PureComponent {
  componentDidMount() {
    const isTodoEvent = event => event.name.toLowerCase().includes('todo');

    this.namespace().listen(
      AllEvents, event => isTodoEvent(event) && this.setState({ lastEvent: event.name })
    );
  }

  render() {
    const { lastEvent } = this.state;

    return (<div>Last event triggered: {lastEvent}</div>);
  }

  state = { lastEvent: null };
}

export default LastTodoEvent;

export const LastTodoEventFn = ({ lastEvent }) => (<div>Last event triggered: {lastEvent}</div>);
