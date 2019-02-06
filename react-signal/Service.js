import Control from './event-hive/control';

class Service {
  constructor(ns, parent) {
    this._ns = ns;
    this._parent = parent;
  }

  namespace() {
    return Control.withActor(this, this._ns);
  }

  parent() {
    return Control.withActor(this, this._parent);
  }

  on(ns) {
    return Control.withActor(this, ns);
  }

  name = 'Service';
}

export default Service;