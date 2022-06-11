import Cookies from 'js-cookie'
const loadWord = (onWordLoaded, min = 10000, max = 15000) => {
  console.log('starting word loading...')
  fetch('/loadword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-CSRFToken': Cookies.get('csrftoken')
    },
    body: JSON.stringify({ min: min, max: max })
  })
    .then(res => res.json())
    .then(onWordLoaded)
    .catch(
      (error) => {
        console.warn('Error while loading word', error)
      }
    )
}

const loadDefinition = (onDefinitionLoaded, word) => {
  console.log('starting word definition loading...')
  fetch('/loaddefinitions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-CSRFToken': Cookies.get('csrftoken')
    },
    body: JSON.stringify({ word: word })
  })
    .then(res => res.json())
    .then(onDefinitionLoaded)
    .catch(
      (error) => {
        console.log(error)
      }
    )
}

const loadTotalWord = (onWordLoaded) => {
  const onWordOnlyLoaded = (data) => loadDefinition(onWordLoaded, data.word)
  loadWord(onWordOnlyLoaded)
}

export { loadWord, loadTotalWord, loadDefinition }
