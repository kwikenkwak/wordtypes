import useSetting, { settings } from 'hooks/useSetting'
import { darkTheme, lightTheme } from 'themes'

export const useTheme = () => {
  const [theme] = useSetting(settings.theme)
  if (theme === 'dark') {
    return darkTheme
  } else if (theme === 'light') {
    return lightTheme
  } else {
    console.warn(`Unknown theme: ${theme}, using light theme`)
    return lightTheme
  }
}
