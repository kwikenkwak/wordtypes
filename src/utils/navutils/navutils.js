import { loadWord } from 'utils/wordloading'

function launchTyper (navigate) {
  loadWord((data) => navigate('/typer/?word=' + data.word))
}

export { launchTyper }
