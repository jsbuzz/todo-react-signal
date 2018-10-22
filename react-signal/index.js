import React from 'react';

import Control from './event-hive/control';
import StateConnector from './connect/StateConnector';

export const NamespaceCtx = React.createContext();

const connectComponent = ComponentClass => class extends ComponentClass {
  on = ns => Control.withActor(this, ns)

  namespace = () => Control.withActor(this, this.props.namespace)

  componentDidMount(...stuff) {
    super.componentDidMount && super.componentDidMount(...stuff);

    this.listen && this.listen();
    this.displayName = ComponentClass.name;
  }

  componentWillUnmount(...stuff) {
    super.componentWillUnmount && super.componentWillUnmount(...stuff);
    Control.cleanup(this);
  }
};

const connectFunction = (fn, namespace, events) => (props) => fn(
  props, (ns) => {
    ns || (ns = props.namespace);
    return Control.withActor(fn, ns)
  }
);

const Connect = (component, selector = null, namespace = null, events = null) => {
  let ConnectedComponent = Enable(component);

  if (selector) {
    ConnectedComponent = StateConnector(namespace, selector, events, ConnectedComponent)
  }

  const HiveComponent = (props) => (
    <NamespaceCtx.Consumer>
      { ctx => <ConnectedComponent {...props} namespace={ctx} /> }
    </NamespaceCtx.Consumer>
  );
  HiveComponent.displayName = `~${ConnectedComponent.displayName}`;

  return HiveComponent;
};

export const Enable = (component) => {
  let ConnectedComponent = component.prototype.render
    ? connectComponent(component)
    : connectFunction(component)
    ;

  ConnectedComponent.displayName = component.name;

  return ConnectedComponent;
};


export default Connect;
