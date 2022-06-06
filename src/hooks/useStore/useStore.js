import { useState } from 'react'
const generateStoreString = (name) =>
  `wordtypes-${name}`

export const useStore = (name, defaultValue) => {
  const storeName = generateStoreString(name)
  const storedValue = JSON.parse(localStorage.getItem(storeName)) || defaultValue
  const [value, setStateValue] = useState(storedValue)

  const setStoredValue = (newValue) => {
    localStorage.setItem(storeName, JSON.stringify(newValue))
    setStateValue(newValue)
  }

  return [value, setStoredValue]
}
