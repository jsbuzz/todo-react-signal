import { EventGateway } from './event-hive/event-gateway';
import Control from './event-hive/control';

export class TestNameSpace extends EventGateway {
  events = [];
  lastEvent = null;

  namespaces = [];
  lastNamespace = [];

  trigger(event) {
    const promise = super.trigger(event);
    this.events.push(event);
    this.lastEvent = event;

    return promise;
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

  startService(Service) {
    const service = new Service(this);
    service.listen();
  
    return service;
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
