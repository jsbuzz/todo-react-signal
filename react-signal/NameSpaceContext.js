import React, { Component } from 'react';
import Control from './event-hive/control';

import { NamespaceCtx } from './';

class NameSpaceContext extends Component {
  componentDidMount() {
    let { namespace, services } = this.props;

    this.services = [];
    if (!services) return;

    ( services.length ? services : [ services ]).forEach((Service) => {
      const instance = new Service();
      if (!instance.listen) return;

      instance.on = (ns) => Control.withActor(instance, ns);
      instance.namespace = () => Control.withActor(instance, namespace);
      instance.displayName = Service.name;

      Control.actor = instance;
      instance.listen();

      this.services.push(instance);
    });
  }

  componentWillUnmount() {
    this.services.forEach((service) => {
      Control.cleanup(service);
      service.destructor && service.destructor();
    });
  }

  render() {
    let { namespace } = this.props;

    return (
      <NamespaceCtx.Provider value={namespace}>
        {this.props.children}
      </NamespaceCtx.Provider>
    );
  }
}

export default NameSpaceContext;
