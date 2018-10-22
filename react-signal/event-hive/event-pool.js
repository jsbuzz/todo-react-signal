import ListenerChain from './listener-chain';

export class EventPool {
    constructor() {
        this.events = new Map();
    }

    addEventListener(eventName, listener, prepend = false) {
        // console.log('addEventListener', eventName, listener);
        if (prepend) {
            return this.events.set(
                eventName,
                ListenerChain.with(
                    listener, this.events.get(eventName)
                )
            );
        }
        if (this.events.has(eventName)) {
            this.events.get(eventName).add(listener);
        } else {
            this.events.set(eventName, ListenerChain.with(listener))
        }
    }

    removeEventListener(eventName, listener) {
        console.log('removeEventListener', eventName, listener);
        let chain = this.events.get(eventName);

        if(chain) {
            let newChain = chain.without(listener);

            if(newChain) {
                this.events.set(eventName, newChain);
            } else {
                this.events.delete(eventName);
            }
        }
    }

    dispatchEvent(fiberEvent) {
        const chain = this.events.get(fiberEvent.name);
        chain && chain.execute(fiberEvent);
    }
}
