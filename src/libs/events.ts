let events: any[] = []

export const on = (eventName: string, handler: any, eventKey: number) => {
  const tempEvents = events.filter(e => e.eventKey === eventKey)
  if (tempEvents.length > 0) {
    console.warn(
      'Event name ' +
        eventName +
        ' has the same eventKey value with ' +
        tempEvents[0].eventName +
        ' which is equal to ' +
        eventKey +
        '. Please choose another key instead!'
    )
  } else {
    const modifiedHandler = (evt: any) => {
      handler(evt.detail)
    }
    window.addEventListener(eventName, modifiedHandler)
    events.push({
      eventName,
      handler: modifiedHandler,
      eventKey
    })
  }
}

export const trigger = (eventName: string, value?: any) => {
  const e = new CustomEvent(eventName, { detail: value })
  window.dispatchEvent(e)
}

export const off = (eventKey: number) => {
  const e = events.filter(e => {
    return e.eventKey === eventKey
  })[0]
  if (e) {
    window.removeEventListener(e.eventName, e.handler)
    events = events.filter(e => e.eventKey !== eventKey)
    window.allEvents = events
  }
}
window.eventSystem = {
  on,
  off,
  trigger,
  events
}
