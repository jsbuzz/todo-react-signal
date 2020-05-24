import { useContext, useState, useEffect } from "react";
import { NamespaceCtx } from "./";
import Control from "./event-hive/control";

const UnknownActor = {
  name: "~Unknown"
};

const getInstance = Component => ({
  name: Component.name || Component.displayName,
  __listeners: []
});

export function useNamespace(component) {
  const namespace = useContext(NamespaceCtx);

  return {
    trigger: (...a) =>
      Control.withActor(component || UnknownActor, namespace).trigger(...a)
  };
}

export const useListeners = Component => (...listeners) => {
  const namespace = useContext(NamespaceCtx);

  useEffect(() => {
    const instance = getInstance(Component);
    Control.withActor(instance, namespace).listen(...listeners);

    return function cleanup() {
      Control.cleanup(instance);
    };
  }, []);

  return {
    trigger: (...a) =>
      Control.withActor(Component || UnknownActor, namespace).trigger(...a)
  };
};
