function addTypeStat (statistic) {
  const stats = loadTypeStats()
  stats.push(statistic)
  localStorage.setItem('typestatistics', JSON.stringify(stats))
}
const loadTypeStats = () => JSON.parse(localStorage.getItem('typestatistics')) || []

function addWordToVoc (word) {
  const words = loadVoc()
  if (!words.includes(word)) {
    words.push(word)
    localStorage.setItem('vocabulary', JSON.stringify(words))
  }
}

const loadVoc = () => JSON.parse(localStorage.getItem('vocabulary')) || []

export { addTypeStat, loadTypeStats, addWordToVoc, loadVoc }
