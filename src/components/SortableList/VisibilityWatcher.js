export default class VisibilityWatcher {
  constructor () {
    this.observer = new IntersectionObserver(
      this.handleIntersect.bind(this))
    this.visibilities = []
    this.elements = []
  }

  observe (element, id) {
    this.visibilities[id] = null
    this.elements[id] = element
    this.observer.observe(element)
  }

  handleIntersect (entries) {
    for (const entry of entries) {
      for (const id of Object.keys(this.elements)) {
        if (this.elements[id] === entry.target) {
          this.visibilities[id] = entry.intersectionRatio
        }
      }
    }
  }

  ready () {
    for (const val of Object.values(this.visibilities)) {
      if (val === null) return false
    }
    return true
  }

  isVisible (id) {
    if (this.visibilities[id] === null) {
      console.warn('Requesting visibility of element',
        this.elements[id], 'with id ', id, 'but the visibility of this element is not yet available')
      return 0
    } else {
      return this.visibilities[id]
    }
  }
}
