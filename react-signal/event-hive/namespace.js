import { basicEvent } from './event';
// import { defineEventType } from './event-type';
import { EventGateway } from './event-gateway';
import ReadOnly from './dependencies/read-only';
import Control from './control';

// export const StateEvent = defineEventType({
//     state: Object,
// });
export const InitState = basicEvent('NameSpace:InitState');
export const StateChanged = basicEvent('NameSpace:StateChanged');
// export const StateChanged = defineEvent(StateEvent, 'NameSpace:StateChanged');

export class NameSpace extends EventGateway {
  constructor(name, stateDefinition) {
    super();
    this.name = name;
    this.__sendStateUpdates = false;

    if (stateDefinition) {
      this.defineState(stateDefinition);
    }
  }

  defineState(stateDefinition, readonly = true) {
    Control.actor = this;
    let state;

    if (readonly) {
      this.__state || (this.__state = new ReadOnly());
      this.state = this.__state.reader;
      state = this.__state;
    } else {
      this.state = {};
      state = this.state;
    }

    Object.getOwnPropertyNames(stateDefinition).forEach(property => {
      if (readonly) {
        this.__state.addProperty(property);
      }
      const setters = stateDefinition[property];
      for (let i = 0; i < setters.length; i += 2) {
        const callback = setters[i + 1];
        const setter = event => {
          if (readonly) {
            this.__state.set(
              property,
              callback(this.__state.modifier[property])(event)
            );
          } else {
            state[property] = callback(state[property])(event);
          }

          if (this.__sendStateUpdates) {
            event.promise.then(() => {
              if (this.__sendStateUpdatesBouncer) {
                global.clearTimeout(this.__sendStateUpdatesBouncer);
              }
              this.__propsChanged[property] = true;
              this.__sendStateUpdatesBouncer = global.setTimeout(() => {
                Control.withActor(this, this).triggerSync(new StateChanged());
                this.__sendStateUpdatesBouncer = null;
                this.__propsChanged = {};
              }, 0);
            });
          }
        };
        setter.__property = property;
        this.addEventListener(setters[i], setter, true);
      }
    });

    this.__propsChanged = {};
    this.triggerSync(new InitState());
  }

  addEventListener(fiberEvent, eventHandler, prepend = false) {
    super.addEventListener(fiberEvent, eventHandler, prepend);
    if (fiberEvent === StateChanged) {
      this.__sendStateUpdates = true;
    }
  }

  static get(name) {
    return this.create(name);
  }

  static create(name, stateDefinition) {
    this.namespaces || (this.namespaces = new Map());

    let namespace = this.namespaces.get(name);

    if (!namespace) {
      namespace = new NameSpace(name, stateDefinition);
      this.namespaces.set(name, namespace);
    }
    return namespace;
  }
}

export const set = value => () => () => value;
export const modify = fn => value => payload => {
  fn(value)(payload);
  return value;
};
