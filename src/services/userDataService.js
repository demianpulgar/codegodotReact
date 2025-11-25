// Maneja likes y guardados por usuario usando localStorage
const KEY = 'userDataByUser'

function readAll() {
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : {}
}

function writeAll(data) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function toggleLike(username, codigoId) {
  const data = readAll()
  const user = data[username] || { likes: [], saves: [] }
  if (user.likes.includes(codigoId)) {
    user.likes = user.likes.filter(id => id !== codigoId)
  } else {
    user.likes.push(codigoId)
  }
  data[username] = user
  writeAll(data)
  return user.likes
}

export function toggleSave(username, codigoId) {
  const data = readAll()
  const user = data[username] || { likes: [], saves: [] }
  if (user.saves.includes(codigoId)) {
    user.saves = user.saves.filter(id => id !== codigoId)
  } else {
    user.saves.push(codigoId)
  }
  data[username] = user
  writeAll(data)
  return user.saves
}

export function getUserData(username) {
  const data = readAll()
  return data[username] || { likes: [], saves: [] }
}
