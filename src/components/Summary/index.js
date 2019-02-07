import Connect from '../../../react-signal';
import Summary from './Summary';

export default Connect(Summary, ({ activeTodos }) => ({ activeTodos }));
