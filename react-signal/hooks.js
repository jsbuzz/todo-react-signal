import { useContext } from "react";
import { NamespaceCtx } from "./";
import Control from "./event-hive/control";

export function useNamespace(component) {
  const namespace = useContext(NamespaceCtx);

  return {
    trigger: (...a) => Control.withActor(component, namespace).trigger(...a)
  };
}
