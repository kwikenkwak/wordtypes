import { useState, useMemo, useRef, useCallback } from 'react'
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

function useVocViewer () {
  const stats = useMemo(() => StatsManager.loadStats(), [])
  const expandTriggerRef = useRef()
  const rootScrollRef = useRef()
  const [visibleWordsAmount, setVisibleWordsAmount] = useState(30)
  const [sortMethod, setSortMethod] = useState('date')
  const [sortDir, setSortDir] = useState('descending')
  const [search, setSearch] = useState('')

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
    // Use set timeout because we want the input to
    // refresh as quickly as possible even when the list
    // is not yet updated
    setTimeout(() => {
      setSearch(e.target.value)
    })
  }

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
    rootScrollRef
  }
}

export default useVocViewer
