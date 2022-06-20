import { loadWord } from 'utils/wordloading'
import { useNavigate } from 'react-router-dom'
import useQueue from 'hooks/useQueue'
import useSetting, { settings } from 'hooks/useSetting'

function useLaunchTyper (word = null, popOff = false) {
  const navigate = useNavigate()
  const { isEmtpy, popWord, removeWord } = useQueue()
  const [wordRange] = useSetting(settings.wordRange)

  const launchTyper = () => {
    if (word) {
      navigate(`/typer/?word=${word}`)
      if (popOff) {
        removeWord(word)
      }
    } else if (!isEmtpy) {
      navigate(`/typer/?word=${popWord()}`)
    } else {
      loadWord((data) => navigate(`/typer/?word=${data.word}`),
        wordRange)
    }
  }
  return launchTyper
}

export { useLaunchTyper }
