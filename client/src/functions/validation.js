class validation {
  static email (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(String(email).toLowerCase())) return true
    return false
  }

  static onlyLetters (item) {
    if (/\d/.test(String(item).toLowerCase())) { return false }
    return true
  }

  static isEmpty (item) {
    if (item.length === 0) { return true }
    return false
  }

  static passowrd (item) {
    if (item.length > 6) { return true }
    return false
  }
}

export default validation
