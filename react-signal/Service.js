import Control from './event-hive/control';

class Service {
  constructor(ns) {
    this._ns = ns;
  }

  namespace() {
    return Control.withActor(this, this._ns);
  }

  on(ns) {
    return Control.withActor(this, ns);
  }

  name = 'Service';
}

export default Service;