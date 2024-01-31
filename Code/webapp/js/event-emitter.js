class EventEmitter {
    constructor() {
        this.events = {};
    }

    // Method to subscribe to an event
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    // Method to emit an event
    emit(eventName) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => callback());
        }
    }
}

export const eventEmitter = new EventEmitter();
