import Connect, { Signal, AllEvents } from '../../../react-signal';
import LastTodoEvent, { LastTodoEventFn } from './LastTodoEvent';

export default Connect(LastTodoEvent);

const isTodoEvent = event => event.name.toLowerCase().includes('todo');
export const lastTodoEventListener = setProps => [
  AllEvents, event => isTodoEvent(event) && setProps({ lastEvent: event.name })
];
export const LastTodoEventSignal = Signal(lastTodoEventListener)(LastTodoEventFn);
