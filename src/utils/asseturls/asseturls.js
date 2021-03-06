// This helps for organising the urls and also
// allows autocompletion because these urls
// are being passed to js by a inline script in
// the home.html django template

function createUrl (filepath) {
  return assetUrl.replace('ASSETPATH', filepath)
}

const urls = {
  typerIcon: createUrl('icons/typericon.svg'),
  backgroundLight: createUrl('pictures/backgroundlight.jpg'),
  backgroundDark: createUrl('pictures/backgrounddark.jpg'),
  enterIcon: createUrl('icons/enterkeybox.svg'),
  homeIcon: createUrl('icons/home.svg'),
  skipIcon: createUrl('icons/skipicon.svg'),
  infoIcon: createUrl('icons/infoicon.svg'),
  perfectImage: createUrl('pictures/perfectimage.svg'),
  backToWord: createUrl('icons/backtoword.svg'),
  loadingBalls: createUrl('animations/loadingballs.riv'),
  retry: createUrl('icons/retry.svg'),
  addQueue: createUrl('icons/addqueue.svg'),
  wpm: createUrl('icons/wpm.svg'),
  accuracy: createUrl('icons/accuracy.svg'),
  queueItemGo: createUrl('icons/queueitemgo.svg'),
  queue: createUrl('icons/queue.svg'),
  drag: createUrl('icons/drag.svg'),
  trash: createUrl('icons/trash.svg'),
  settings: createUrl('icons/settings.svg'),
  close: createUrl('icons/close.svg'),
  stats: createUrl('icons/stats.svg'),
  thinking: createUrl('icons/thinking.svg'),
  rocket: createUrl('icons/rocket.svg'),
  github: createUrl('icons/github.svg')
}

export { urls }
