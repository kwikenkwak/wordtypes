// This class helps the useStore hooks
// to make sure that if one component using a store
// updates the stored value, every other
// component using the same store will
// also receive the updated value.
class StoreManager {
  constructor () {
    this.callbacks = {}
  }

  addCallback (key, callback) {
    if (!this.callbacks[key]) {
      this.callbacks[key] = []
    }
    this.callbacks[key].push(callback)
  }

  removeCallback (key, callback) {
    if (this.callbacks[key]) {
      this.callbacks[key] = this.callbacks[key].filter(cb => cb !== callback)
    }
  }

  notifyUpdate (key) {
    if (this.callbacks[key]) {
      this.callbacks[key].forEach(cb => cb())
    }
  }
}

export const storeManager = new StoreManager()
