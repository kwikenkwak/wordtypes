import { useState, useMemo } from 'react'
import { StatsManager } from '../statsmanager.js'

const compareDate = (a, b) => new Date(a.date) - new Date(b.date)
const compareName = (a, b) => {
  if (a.word === b.word) {
    return 0
  }
  return a.word < b.word ? -1 : 1
}
const compareWpm = (a, b) => a.wpm - b.wpm
const compareAccuracy = (a, b) => a.accuracy - b.accuracy

function getWordList (words, method, dir, search) {
  words = words.filter((word) => word.word.startsWith(search))
  words = words.slice()
  words.sort({
    date: compareDate,
    name: compareName,
    wpm: compareWpm,
    accuracy: compareAccuracy
  }[method])
  if (dir === 'descending') words.reverse()
  return words
}

function useVocabularyViewer () {
  const stats = useMemo(() => StatsManager.loadStats(), [])
  const [sortMethod, setSortMethod] = useState('date')
  const [sortDir, setSortDir] = useState('descending')

  const [words, setWords] = useState(getWordList(Object.values(stats),
    'date', 'descending', ''))

  const sortDirChoices = ['ascending', 'descending']
  const sortMethodChoices = ['date', 'name', 'wpm', 'accuracy']
  const [search, setSearch] = useState('')

  const onSearchChange = (e) => {
    // Use set timeout because we want the input to
    // refresh as quickly as possible even when the list
    // is not yet updated
    setTimeout(() => {
      const newSearch = e.target.value
      setSearch(newSearch)
      setWords(getWordList(Object.values(stats), sortMethod, sortDir, newSearch))
    })
  }

  const onSortDirChange = (newDir) => {
    setSortDir(newDir)
    setWords(getWordList(Object.values(stats), sortMethod, newDir, search))
  }

  const onSortMethodChange = (newMethod) => {
    setSortMethod(newMethod)
    setWords(getWordList(Object.values(stats), newMethod, sortDir, search))
  }

  return {
    words,
    sortDirChoices,
    onSortDirChange,
    sortMethodChoices,
    onSortMethodChange,
    sortDir,
    sortMethod,
    onSearchChange,
    search
  }
}

export { useVocabularyViewer }
