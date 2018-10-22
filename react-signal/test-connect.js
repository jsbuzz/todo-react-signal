import { EventGateway } from './event-hive/event-gateway';
import Control from './event-hive/control';

export class TestNameSpace extends EventGateway {
  events = [];
  lastEvent = null;

  namespaces = [];
  lastNamespace = [];

  trigger(event) {
    super.trigger(event);
    this.events.push(event);
    this.lastEvent = event;
  }

  withNamespace(NS) {
    this.namespaces.push(NS);
    this.lastNamespace = NS;
    return this;
  }

  reset() {
    this.events = [];
    this.lastEvent = null;
    this.namespaces = [];
    this.lastNamespace = null;
  }

  hasListenerFor(Event) {
    return this.eventPool.events.has(Event.EventName);
  }
};

// export const TestConnect = (fn, NS = new TestNameSpace()) => (props) => fn(
//   props, (ns) => (ns || NS)
// );

export const TestConnect = (ComponentClass, NS = new TestNameSpace()) => class extends ComponentClass {
  on = (ns) => NS.withNamespace(ns);
  namespace = () => NS.withNamespace(NS);

  // componentDidMount(...stuff) {
  //   super.componentDidMount && super.componentDidMount(...stuff);
  //
  //   this.listen && this.listen();
  //   this.displayName = ComponentClass.name;
  // }
};

export const StartService = (Service, NS) => {
  const service = new Service(NS);
  service.on = (ns) => NS.withNamespace(ns);
  service.namespace = () => NS.withNamespace(NS);
  Control.actor = service;
  service.listen();

  return service;
};
