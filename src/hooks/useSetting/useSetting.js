import useStore from 'hooks/useStore'

const defaults = {
  wordRange: [0, 100_000],
  theme: 'light',
  defLimit: 10
}

export const useSetting = (setting) => {
  const [value, setValue] = useStore(setting, defaults[setting])
  return [value, setValue]
}

export const settings = {
  wordRange: 'wordRange',
  theme: 'theme',
  defLimit: 'defLimit'
}
