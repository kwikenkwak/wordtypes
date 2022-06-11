import { loadWord } from 'utils/wordloading'
import { useNavigate } from 'react-router-dom'
import useQueue from 'hooks/useQueue'

function useLaunchTyper () {
  const navigate = useNavigate()
  const { isEmtpy, popWord } = useQueue()

  const launchTyper = () => {
    if (!isEmtpy) {
      navigate(`/typer/?word=${popWord()}`)
    } else {
      loadWord((data) => navigate(`/typer/?word=${data.word}`))
    }
  }
  return launchTyper
}

export { useLaunchTyper }
