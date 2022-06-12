import { useState } from 'react'
const generateStoreString = (name) =>
  `wordtypes-${name}`

export const useStore = (name, defaultValue) => {
  const storeName = generateStoreString(name)
  const loadValue = () => JSON.parse(localStorage.getItem(storeName)) || defaultValue
  const storedValue = loadValue()
  const [value, setStateValue] = useState(storedValue)

  const setStoredValue = (newValue) => {
    if (typeof (newValue) === 'function') {
      newValue = newValue(loadValue())
    }
    // By doing this we create a new pointer to the value
    // so that if it's a list and the same (modified) object
    // was passed again the object will still be different
    newValue = JSON.parse(JSON.stringify(newValue))

    localStorage.setItem(storeName, JSON.stringify(newValue))
    setStateValue(newValue)
  }

  return [value, setStoredValue]
}
