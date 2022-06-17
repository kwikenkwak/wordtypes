import useStore from 'hooks/useStore'
import { useContext } from 'react'
import { NotifyContext } from 'utils/notifications'

export const useQueue = () => {
  const [queue, setQueue] = useStore('queue', [])
  const { notify } = useContext(NotifyContext)
  const addWord = (word) => {
    setQueue((queue) => {
      if (queue.includes(word)) {
        notify(`The word '${word}' is already added to the queue!`)
        return queue
      }
      const newQueue = [...queue, word]
      notify(`Added the word '${word}' to the queue`)
      return newQueue
    })
  }

  const removeWord = (word) => {
    setQueue((queue) => {
      if (!queue.includes(word)) {
        console.warn(`Tried to remove the word '${word}' from the queue` +
                   ' but it was not present in the queue')
        return queue
      }
      notify(`Removed the word '${word}' from the queue`)
      queue.splice(queue.indexOf(word), 1)
      return queue
    })
  }

  const popWord = () => {
    let value
    setQueue((queue) => {
      if (queue.length === 0) {
        console.warn('Tried to pop a word from the queue' +
                     ' but the queue was empty')
        return queue
      }
      value = queue.splice(0, 1)[0]
      notify(`Popped the word '${value}' from the queue`)
      return queue
    })
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
