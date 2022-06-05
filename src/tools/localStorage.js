/**
 * Local Storage service
 */
class LocalStorage {
  constructor() {
    this._ls = window.localStorage;
  }

  get(key) {
    let result = this._ls.getItem(key);

    // Hack for undefined
    try {
      result = JSON.parse(result);
    } catch (err) {
      console.warn(err);
    }

    return result;
  }

  set(key, val) {
    if (!val) {
      this.remove(key);
      return;
    }

    const item = typeof val === 'object' ? JSON.stringify(val) : val;

    this._ls.setItem(key, item);
  }

  remove(key) {
    this._ls.removeItem(key);
  }

  clear() {
    this._ls.clear();
  }
}

export default new LocalStorage();
