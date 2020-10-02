import Service from "../../react-signal/Service";
import { AllEvents } from "../../react-signal/event-hive/event";

class Silencer extends Service {
  listen() {
    this.namespace().listen(AllEvents, (event) => event.cancel());
  }
}

export default Silencer;
