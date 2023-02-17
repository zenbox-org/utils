/* eslint-disable no-console */

export class ConsoleTimer {
  constructor(public label: string) {
    console.time(label)
  }

  log() {
    console.timeLog(this.label, ...arguments)
  }

  end() {
    console.timeEnd(this.label)
  }
}
