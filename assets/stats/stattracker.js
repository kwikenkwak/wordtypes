import { StatsManager } from './statsmanager.js'
class StatTracker {
  constructor (name) {
    this.name = name
    this.totalTypeCount = 0
    this.correctTypeCount = 0
    this.keysData = []
    this.hasDumped = false
  }

  startTimer () {
    this.startTime = new Date()
  }

  registerKey (key, correct) {
    this.totalTypeCount += 1
    if (correct) {
      this.correctTypeCount += 1
    }

    if (this.startTime) {
      this.keysData.push({
        correct: correct,
        time: (new Date()).getTime() - this.startTime.getTime(),
        key: key
      })
    } else {
      console.warn('A key was registered without the timer running')
    }
  }

  dumpData () {
    if (this.hasDumped) {
      console.warn('Dumping data that has already been dumped')
    }
    StatsManager.dumpWordStat(this.name, this.getData())
    this.hasDumped = true
  }

  getData () {
    return {
      word: this.name,
      total: this.totalTypeCount,
      correct: this.correctTypeCount,
      keysData: this.keysData,
      date: new Date()
    }
  }
}

export { StatTracker }