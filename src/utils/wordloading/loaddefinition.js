// Fetch the data from the Wiktionary API.
// Wiktionary gives us data in the following format:
// const data = {
//   en:
//     [{
//       partOfSpeech: 'Noun',
//       language: 'English',
//       definitions: [
//         {
//           definition: 'definition 1',
//           parsedExamples: [{ example: 'example 1' }, { example: 'example 2' }]
//         },
//         { definition: 'definition 2' }
//       ]
//     }]
// }

// But we wan't it like this:
// const data = {
//   definitions: [
//     { type: 'Noun', definition: 'definition 1', examples: ['example 1', 'example 2'] },
//     { type: 'Noun', definition: 'definition 2' }
//   ]
// }
//
// Besides of the structural differences, the definitions and examples
// strings also contain some HTML tags. We need to remove them.

export default function loadDefinition (onDefinitionLoaded, word) {
  const endpoint = 'https://en.wiktionary.org/api/rest_v1/page/definition'
  const targetUrl = `${endpoint}/${word}`

  fetch(targetUrl).then(res => res.json())
    .then(onDataLoaded.bind(null, onDefinitionLoaded, word)).catch(error => {
      console.warn('Error while loading definition', error)
    }
    )
}

function onDataLoaded (onDefinitionLoaded, word, data) {
  const definitions = parseWiktionaryData(data)
  onDefinitionLoaded({ word: word, definitions: definitions })
}

function parseWiktionaryData (data) {
  const definitions = []
  // If the word was not found, return an empty array.
  if (data.title === 'Not found.' ||
      !data.en) return definitions

  data.en.forEach(entry => {
    const { partOfSpeech, definitions: entryDefinitions } = entry
    entryDefinitions.forEach(definition => {
      const { definition: definitionText, parsedExamples: examples } = definition
      if (definitionText) {
        definitions.push({
          type: partOfSpeech,
          definition: purify(definitionText),
          examples: examples ? examples.map(example => purify(example.example)) : []
        })
      }
    })
  }
  )
  return definitions
}

function purify (text) {
  return removeNonAscii(removeHtmlTags(text))
}

// Sometimes we find strange characters in the definition.
// such a — which the user can't type, therefore we
// only allow ASCII characters.
function removeNonAscii (text) {
  return text.replace(/[^\x00-\x7F]/g, ' ')
}

function removeHtmlTags (text) {
  return text.replace(/<[^>]*>/g, '')
}
