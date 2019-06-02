import { Signal } from '../../../react-signal';
import { ToggleEvent, Toggle } from './Toggle';

export default Signal((get, set) => [
  ToggleEvent(get('name')),
  () => set({ show: !get('show') })
])(Toggle);
