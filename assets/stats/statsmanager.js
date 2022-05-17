import { calcWpm, calcAccuracy } from './statutils.js'

class StatsManager {
  static dumpWordStat (key, wordStats) {
    const stats = this.loadStats(false)
    stats[key] = wordStats
    this.dumpAllStats(stats)
  }

  static dumpAllStats (stats) {
    localStorage.setItem(this.wordStatsName, JSON.stringify(stats))
  }

  static loadWordStat (key) {
    return this.loadStats[key]
  }

  static loadStats (ensureSecondary = true) {
    return ensureSecondary
      ? this.ensureSecondaryData(
        JSON.parse(localStorage.getItem(this.wordStatsName)) || {})
      : JSON.parse(localStorage.getItem(this.wordStatsName)) || {}
  }

  static ensureSecondaryData (stats) {
    let changedSomething = false
    for (const stat of Object.values(stats)) {
      if (stat.wpm === undefined) {
        stat.wpm = calcWpm(stat)
        changedSomething = true
      }
      if (stat.accuracy === undefined) {
        stat.accuracy = calcAccuracy(stat)
        changedSomething = true
      }
    }
    // Save this so we don't have to do it again
    if (changedSomething) this.dumpAllStats(stats)
    return stats
  }

  static get wordStatsName () { return 'wordtyperwordkeys' }
}

export { StatsManager }
