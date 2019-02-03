import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Control from './react-signal/event-hive/control';

configure({ adapter: new Adapter() });
Control.logging = false;
