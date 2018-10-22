import Connect from '../../../react-signal';
import TodoList from './TodoList';

export default Connect(TodoList, ({ todos }) => ({ todos }));
