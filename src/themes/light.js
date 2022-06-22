import urls from 'utils/asseturls'
const lightTheme = {
  colors: {
    particleCorrect: 'rgba(255, 255, 255, 30%)',
    particleError: 'rgba(255, 0, 0, 30%)',
    particleText: 'rgba(255, 255, 255, 30%)',
    bg: 'rgba(253, 185, 20, 80%)',
    base: 'rgba(255, 255, 255, 80%)',
    baseColorGraph: 'rgba(255, 255, 255, 80%)',
    acc: 'rgba(200, 120, 0, 80%)'
  },
  background: {
    image: urls.backgroundLight,
    brightness: '80%'
  },
  icons: {
    iconfilter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(213deg) brightness(100%) contrast(106%) ',
    iconopacity: '80%'
  }
}

export { lightTheme }
