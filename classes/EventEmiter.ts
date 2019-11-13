type cbType = <T extends EventEmiter>(that: T) => void
class EventEmiter {
  events: { [key: string]: cbType[] }
  constructor() {
    this.events = {}
  }

  subscribe(event: string, cb: cbType) {
    if (!this.events[event]) {
      this.events[event] = []
    }

    this.events[event].push(cb)

    return () => this.events[event].filter(cbEvent => cbEvent !== cb)
  }

  emit(event: string) {
    this.events[event].forEach(cb => cb(this))
  }
}
