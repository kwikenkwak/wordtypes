function mRound (a, n = 0) {
  return Math.round(Math.pow(10, n) * a) / Math.pow(10, n)
}

function calcWpm (stats) {
  const time = stats.keysData[stats.keysData.length - 1].time
  return ((60000 * stats.correct) / (time * 5))
}

function calcAccuracy (stats) {
  return mRound(100 * stats.correct / stats.total, 2)
}

export { mRound, calcWpm, calcAccuracy }
