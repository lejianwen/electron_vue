const TokenKey = 'fileHelper-token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

const fileStoragePathKey = 'fileStoragePathKey'
export function setStoragePath(path) {
  return localStorage.setItem(fileStoragePathKey, path)
}

export function getStoragePath() {
  return localStorage.getItem(fileStoragePathKey) || window.userDataDir
}
