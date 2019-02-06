import React, { Component } from 'react';
import Control from './event-hive/control';

import { NamespaceCtx } from './';

const NameSpaceContextWrapper = ({ namespace, services, children }) => (
  <NamespaceCtx.Consumer>
    {parentNamespace => (
      <NameSpaceContext
        namespace={namespace()}
        services={services}
        parentNamespace={parentNamespace && parentNamespace.namespace}
      >
        {children}
      </NameSpaceContext>
    )}
  </NamespaceCtx.Consumer>
);

class NameSpaceContext extends Component {
  componentDidMount() {
    let { namespace, parentNamespace, services } = this.props;

    this.services = [];
    if (!services) return;

    (services.length ? services : [services]).forEach(Service => {
      const instance = new Service(namespace, parentNamespace);
      if (!instance.listen) return;

      instance.displayName = Service.name;

      Control.actor = instance;
      instance.listen();

      this.services.push(instance);
    });
  }

  componentWillUnmount() {
    this.services.forEach(service => {
      Control.cleanup(service);
      service.destructor && service.destructor();
    });
  }

  render() {
    let { namespace, parentNamespace } = this.props;

    return (
      <NamespaceCtx.Provider value={{ namespace, parentNamespace }}>
        {this.props.children}
      </NamespaceCtx.Provider>
    );
  }
}

export default NameSpaceContextWrapper;
