import { Signal } from '../../../react-signal';
import { LastOperationRenderer, LastOperationListeners } from './LastOperation';

export default Signal(LastOperationListeners)(LastOperationRenderer);
