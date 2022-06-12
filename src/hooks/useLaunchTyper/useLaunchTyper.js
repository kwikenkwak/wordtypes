import { loadWord } from 'utils/wordloading'
import { useNavigate } from 'react-router-dom'
import useQueue from 'hooks/useQueue'

function useLaunchTyper (word = null, popOff = false) {
  const navigate = useNavigate()
  const { isEmtpy, popWord, removeWord } = useQueue()

  const launchTyper = () => {
    if (word) {
      navigate(`/typer/?word=${word}`)
      if (popOff) {
        removeWord(word)
      }
    } else if (!isEmtpy) {
      navigate(`/typer/?word=${popWord()}`)
    } else {
      loadWord((data) => navigate(`/typer/?word=${data.word}`))
    }
  }
  return launchTyper
}

export { useLaunchTyper }
