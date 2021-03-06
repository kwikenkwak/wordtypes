import { useState, useMemo, useRef, useCallback } from 'react'
import useStore from 'hooks/useStore'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import StatsManager from 'utils/StatsManager'

const WORDS_PER_LOAD = 20

const compareDate = (a, b) => new Date(a.date) - new Date(b.date)
const compareName = (a, b) => {
  if (a.word === b.word) {
    return 0
  }
  return a.word < b.word ? -1 : 1
}
const compareWpm = (a, b) => a.wpm - b.wpm
const compareAccuracy = (a, b) => a.accuracy - b.accuracy

function getWordList (words, method, dir, search, amount) {
  words = words.filter((word) => word.word.startsWith(search))
  words = words.slice()
  words.sort({
    date: compareDate,
    name: compareName,
    wpm: compareWpm,
    accuracy: compareAccuracy
  }[method])
  if (dir === 'descending') words.reverse()
  return words.slice(0, amount)
}

function useVocViewer (memoryId, openViewer) {
  const stats = useMemo(() => StatsManager.loadStats(), [])
  const expandTriggerRef = useRef()
  const rootScrollRef = useRef()
  const [visibleWordsAmount, setVisibleWordsAmount] = useState(30)
  const [sortMethod, setSortMethod] = useStore(memoryId + 'sortmethod', 'date')
  const [sortDir, setSortDir] = useStore(memoryId + 'sortdir', 'descending')
  const [search, setSearch] = useStore(memoryId + 'sortsearch', '')

  const expandList = useCallback(() => {
    if (visibleWordsAmount < Object.keys(stats).length) {
      setVisibleWordsAmount((a) => a + WORDS_PER_LOAD)
    }
  }, [])

  const words = useMemo(() =>
    getWordList(
      Object.values(stats),
      sortMethod,
      sortDir,
      search,
      visibleWordsAmount)
  , [stats, sortMethod, sortDir, search, visibleWordsAmount])

  useIntersectionObserver(rootScrollRef.current, expandTriggerRef.current, expandList, 0.30)

  const sortDirChoices = ['ascending', 'descending']
  const sortMethodChoices = ['date', 'name', 'wpm', 'accuracy']

  const onSearchChange = (e) => {
    const newSearch = e.target.value
    // Use set timeout because we want the input to
    // refresh as quickly as possible even when the list
    // is not yet updated
    setTimeout(() => {
      setSearch(newSearch)
    })
  }

  // Bind the openViewer to each individual
  // word's stats
  const openViewers = words.map((word) => {
    return () => openViewer(word)
  })

  const onSortDirChange = (newDir) => {
    setSortDir(newDir)
  }

  const onSortMethodChange = (newMethod) => {
    setSortMethod(newMethod)
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
    search,
    expandTriggerRef,
    rootScrollRef,
    openViewers
  }
}

export default useVocViewer
