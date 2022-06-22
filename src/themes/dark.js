import urls from 'utils/asseturls'
const darkTheme = {
  colors: {
    particleCorrect: 'rgba(244, 120, 4, 30%)',
    particleError: 'rgba(255, 0, 0, 70%)',
    particleText: 'rgba(0, 0, 0, 30%)',
    bg: 'rgba(0, 0, 0, 80%)',
    base: 'rgba(255, 0, 0, 80%)',
    baseColorGraph: 'rgba(255, 0, 0, 80%)',
    acc: 'rgba(100, 0, 0, 90%)'
  },
  background: {
    image: urls.backgroundDark,
    brightness: '50%'
  },
  icons: {
    iconfilter: 'invert(19%) sepia(99%) saturate(6775%) hue-rotate(0deg) brightness(109%) contrast(118%)',
    iconopacity: '80%'
  }
}

export { darkTheme }
