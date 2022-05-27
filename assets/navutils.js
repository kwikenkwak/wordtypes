import { loadWord } from './wordloading'

function launchTyper (navigate) {
  loadWord((data) => navigate('/typer/?word=' + data.word))
}

export { launchTyper }
