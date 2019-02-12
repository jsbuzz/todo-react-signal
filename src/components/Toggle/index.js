import { Signal } from '../../../react-signal';
import { ToggleEvent, Toggle } from './Toggle';

export default Signal((set, get) => [
  ToggleEvent(get('name')), () => set({ show: !get('show') })
])(Toggle);
