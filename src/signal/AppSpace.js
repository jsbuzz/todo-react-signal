import {
  NameSpace,
  InitState,
  set,
} from '../../react-signal/event-hive/namespace';
import { UpdateActive } from './events';

const AppSpace = NameSpace.schema('Ns.App', () => ({
  activeTodos: [
    InitState, set(0),
    
    // update number of active todos
    UpdateActive, activeTodos => ({ active }) => console.log(active) || active
  ]
}));

window.AppSpace = AppSpace;

export default AppSpace;
