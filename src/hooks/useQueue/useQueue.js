import useStore from 'hooks/useStore'

export const useQueue = () => {
  const [queue, setQueue] = useStore('queue', [])
  const addWord = (word) => {
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

  return { queue, addWord, removeWord, popWord }
}
