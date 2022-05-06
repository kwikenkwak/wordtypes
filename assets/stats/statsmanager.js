class StatsManager {
  static dumpWordStat (key, wordStats) {
    const stats = this.loadStats()
    stats[key] = wordStats
    localStorage.setItem(this.wordStatsName, JSON.stringify(stats))
  }

  static loadWordStat (key) {
    return this.loadStats[key]
  }

  static loadStats () {
    return JSON.parse(localStorage.getItem(this.wordStatsName)) || {}
  }

  static get wordStatsName () { return 'wordtyperwordkeys' }
}

export { StatsManager }
