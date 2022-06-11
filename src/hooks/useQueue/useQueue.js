import useStore from 'hooks/useStore'
import { useContext } from 'react'
import { NotifyContext } from 'utils/notifications'

export const useQueue = () => {
  const [queue, setQueue] = useStore('queue', [])
  const { notify } = useContext(NotifyContext)
  const addWord = (word) => {
    if (queue.includes(word)) {
      notify(`The word '${word}' is already added to the queue!`)
      return
    }
    const newQueue = [...queue, word]
    notify(`Added the word '${word}' to the queue`)
    setQueue(newQueue)
  }

  const removeWord = (word) => {
    notify(`Removed the word '${word}' from the queue`)
    queue.splice(queue.indexOf(word), 1)
    setQueue(queue)
  }

  const popWord = () => {
    const value = queue.pop()
    notify(`Popped the word '${value}' from the queue`)
    setQueue(queue)
    return value
  }

  const moveWord = (oldIdx, newIdx) => {
    const removed = queue.splice(oldIdx, 1)
    queue.splice(newIdx, 0, removed[0])
    setQueue(queue)
  }

  return {
    queue,
    addWord,
    removeWord,
    popWord,
    moveWord,
    isEmtpy: queue.length === 0
  }
}
