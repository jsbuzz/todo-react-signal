import Control from './control';
import { EventPool } from './event-pool';

export class EventGateway {
    constructor() {
        this.eventPool = new EventPool();
    }

    // trigger event after current execution ended
    trigger(hiveEvent) {
        if (hiveEvent.withAlias) {
            hiveEvent = new hiveEvent();
        }
        const actor = Control.actor;
        const promise = new Promise(
            resolve => global.setTimeout(
                () => resolve(this.triggerSync(hiveEvent, actor)),
                0
            )
        );
        hiveEvent.promise = promise;

        return promise;
    }

    // trigger event within current execution stack
    triggerSync(hiveEvent, actor = null) {
        if (hiveEvent.withAlias) {
            hiveEvent = new hiveEvent();
        }
        actor && (Control.actor = actor);
        Control.logTriggerSync(hiveEvent);
        return this.eventPool.dispatchEvent(hiveEvent);
    }

    listen(...listeners) {
        for(let i=0; i < listeners.length; i+=2) {
            this.addEventListener(listeners[i], listeners[i+1]);
        }
    }

    addEventListener(fiberEvent, eventHandler, prepend = false) {
        this.eventPool.addEventListener(
            fiberEvent.EventName,
            eventHandler,
            prepend
        );

        Control.registerListener(this.eventPool, fiberEvent.EventName, eventHandler);
    }
}
