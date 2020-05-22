import { useContext } from "react";
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
