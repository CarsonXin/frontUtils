interface IFuncObject {
    [propName: string]: Function
}

export class EventBus {
    constructor() {}

    private hub: IFuncObject = Object.create(null)

    emit(eventName: string, ...args: any) {
        if (typeof this.hub[eventName] === 'function') {
            this.hub[eventName](...args)
        } else {
            console.warn('it seems we don\'t has such a event')
        }
    }

    on(eventName: string, handler: Function) {
        if (typeof handler === 'function') {
            this.hub[eventName] = handler
        }
        else {
            console.warn('you should pass a function as second argument')
        }
    }

    off(eventName: string) {
        delete this.hub[eventName]
    }
}
