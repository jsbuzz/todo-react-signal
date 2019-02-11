import { Signal } from '../../../react-signal';
import { LastOperation, LastOperationListeners } from './LastOperation';

export default Signal(LastOperationListeners)(LastOperation);
