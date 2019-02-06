const ARROW = '-->';
const INDENT = '   ';

const Control = {
  logging: true,
  actor: null,
  withActor: (actor, ns) => {
    Control.actor = actor;
    return ns;
  },
  registerListener: (eventPool, eventName, listener) => {
    (Control.actor.__listeners || (Control.actor.__listeners = [])).push({
      eventPool,
      eventName,
      listener
    });
  },
  cleanup: actor => {
    if (!actor.__listeners) return;

    actor.__listeners.forEach(({ eventPool, eventName, listener }) => {
      eventPool.removeEventListener(eventName, listener);
    });
  },
  logTriggerSync: (hiveEvent, gateway) => {
    if (!Control.logging) return;

    if (hiveEvent.name === 'NameSpace:StateChanged') {
      console.log(
        `${Control.actor.name}:${Control.actor.id}`,
        'triggered',
        hiveEvent.name,
        Control.actor._propsChanged || []
      );
    } else {
      console.log(
        Control.actor.name || Control.actor.displayName || 'Component',
        'triggered',
        hiveEvent.name,
        'on',
        `${gateway.name}:${gateway.id}`
      );
    }
  },
  logCallback: (actor, fn, event) => {
    if (!Control.logging) return;

    if (
      actor.displayName &&
      actor.displayName.substr(0, 15) === 'StateConnector('
    ) {
      console.log(
        ARROW,
        actor.displayName,
        'checking changes',
        `<-[${event.name}]`
      );
    } else {
      console.log(
        ARROW,
        actor.displayName || actor.name,
        'calling',
        fnName(fn),
        `<-[${event.name}]`
      );
    }
  },
  logRerender: (stateConnector, prop) => {
    if (!Control.logging) return;

    console.log(
      INDENT,
      stateConnector.displayName,
      `re-rendering because "${prop}" changed`
    );
  }
};

export default Control;

function fnName(fn) {
  const propName = fn.__property ? `<${fn.__property}>` : '';

  if (fn.name) return fn.name + propName;

  const def = fn.toString().match(/_this[0-9]?\.([a-zA-Z_$]+)\(/i);

  return def && def.length > 1 ? `'${def[1]}${propName}'` : 'inline callback';
}
