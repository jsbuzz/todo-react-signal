const Control = {
  actor: null,
  withActor: (actor, ns) => { Control.actor = actor; return ns; },
  registerListener: (eventPool, eventName, listener) => {
    (
      Control.actor.__listeners || (Control.actor.__listeners = [])
    ).push({ eventPool, eventName, listener });
  },
  cleanup: (actor) => {
    if (!actor.__listeners) return ;

    actor.__listeners.forEach(({ eventPool, eventName, listener }) => {
      eventPool.removeEventListener(eventName, listener);
    });
  },
  logTriggerSync: (hiveEvent) => {
    if (hiveEvent.name === 'NameSpace:StateChanged') {
      console.log(
        Control.actor.name, 'triggered', hiveEvent.name,
        Control.actor.__propsChanged || [],
      );
    } else {
      console.log(
        Control.actor.name || Control.actor.displayName || 'Component',
        'triggered', hiveEvent.name,
      );
    }
  },
  logCallback: (actor, fn, event) => {
    if (actor.displayName && actor.displayName.substr(0, 15) === 'StateConnector(') {
      console.log('-->', actor.displayName, 'checking changes', `<-[${event.name}]`);
    } else {
      console.log('-->', actor.displayName || actor.name, 'calling', fnName(fn), `<-[${event.name}]`);
    }
  },
  logRerender: (stateConnector, prop) => {
    console.log('   ', stateConnector.displayName, 're-rendering because', prop, 'changed');
  },
}

export default Control;

function fnName(fn) {
  const propName = fn.__property ? `<${fn.__property}>` : '';

  if (fn.name) return fn.name + propName;

  const def = fn.toString().match(/_this2\.([a-zA-Z_$]+)\(/i);

  return def && (def.length > 1)
    ? `'${def[1]}${propName}'`
    : 'inline callback'
    ;
}
