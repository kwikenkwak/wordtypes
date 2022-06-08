import useStore from 'hooks/useStore'

export const useQueue = () => {
  const [queue, setQueue] = useStore('queue', [])
  const addWord = (word) => {
    if (queue.includes(word)) {
      console.warn('Tried to add a word to the queue but it was already in the queue')
      return
    }
    const newQueue = [...queue, word]
    setQueue(newQueue)
  }

  const removeWord = (word) => {
    queue.splice(queue.indexOf(word), 1)
    setQueue(queue)
  }

  const popWord = (word) => {
    const value = queue.pop()
    setQueue(queue)
    return value
  }

  const moveWord = (oldIdx, newIdx) => {
    const removed = queue.splice(oldIdx, 1)
    queue.splice(newIdx, 0, removed[0])
    setQueue(queue)
  }

  return { queue, addWord, removeWord, popWord, moveWord }
}
