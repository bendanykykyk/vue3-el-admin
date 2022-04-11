class LocalStorage {
  set(key: string, value: string) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  get(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  remove(key: string) {
    window.localStorage.removeItem(key)
  }

  clear() {
    window.localStorage.clear()
  }
}

export default new LocalStorage()
