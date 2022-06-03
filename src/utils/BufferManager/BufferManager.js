class BufferManager {
  constructor () {
    this.buffers = {}
  }

  addBuffer (dataUrl) {
    this.buffers[dataUrl] = null
    this.loadUrl(dataUrl)
  }

  setBuffer (dataUrl, callback = null) {
    if (Object.keys(this.buffers).includes(dataUrl)) {
      console.log('Attempt to set buffer twice')
    } else {
      const onComplete = (res) => {
        this.buffers[dataUrl] = res
        if (callback) {
          callback(res)
        }
      }
      fetch(dataUrl).then((res) => res.arrayBuffer()).then(onComplete)
    }
  }

  isLoaded (dataUrl) {
    return Boolean(this.buffers[dataUrl])
  }

  getBuffer (dataUrl, autoget = true) {
    if (this.isLoaded(dataUrl)) return this.buffers[dataUrl]
    else {
      if (this.buffers[dataUrl] === null) {
        console.log('Attempting to load buffer that is not yet loaded')
      } else if (this.buffers[dataUrl] === undefined) {
        console.log('Attempt to load buffer with unknown key')
      }
      return false
    }
  }

  load (dataUrl, callback) {
    if (this.buffers[dataUrl]) {
      return this.buffers[dataUrl]
    } else {
      this.setBuffer(dataUrl, callback)
    }
  }
}

const bufferManager = new BufferManager()

export { bufferManager as BufferManager }
