import Cookies from 'js-cookie'
const loadWord = (onWordLoaded, wordRange) => {
  fetch('/loadword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'X-CSRFToken': Cookies.get('csrftoken')
    },
    body: JSON.stringify({ min: Math.floor(wordRange[0]), max: Math.floor(wordRange[1]) })
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

const loadTotalWord = (onWordLoaded, wordRange) => {
  const onWordOnlyLoaded = (data) => loadDefinition(onWordLoaded, data.word)
  loadWord(onWordOnlyLoaded)
}

export { loadWord, loadTotalWord, loadDefinition }
