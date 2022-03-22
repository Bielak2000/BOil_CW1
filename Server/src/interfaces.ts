export type InputData = {
    action: string,
    duration: number,
    prev: number,
    next: number
}

export type Event = {
    eventId: number,
    earliest: number,
    latest: number,
    stock: number
}

export type Action = {
    name: string,
    duration: number,
    prevEventId: number,
    nextEventId: number
}

export type OutputData = {
    events: Event[],
    actions: Action[],
    criticalPath: Event[],
    maxTime: number
}