import { useContext, useState, useEffect } from "react";
import { NamespaceCtx } from "./";
import Control from "./event-hive/control";

const UnknownActor = {
  name: "~Unknown"
};

export function useNamespace(component) {
  const namespace = useContext(NamespaceCtx);

  return {
    trigger: (...a) =>
      Control.withActor(component || UnknownActor, namespace).trigger(...a)
  };
}

export function useListeners(component) {
  return listener$ => {
    const namespace = useContext(NamespaceCtx);
    const [state, setState] = useState({});

    const listeners = listener$(setState);

    useEffect(() => {
      Control.withActor(component, namespace).listen(...listeners);

      return function cleanup() {
        Control.cleanup(component);
      };
    });

    return { state };
  };
}
