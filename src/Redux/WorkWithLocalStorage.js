// Запись данных в localStorage
export function setLocalStorage(name, data) {
  try {
    localStorage.setItem(name, data)
  } catch (err) {
    throw Error(err.message)
  }
}

// Получение данных из localStorage
export function getLocalStorage(name) {
  let user = localStorage.getItem(name)
  if (user !== 'undefined' && user !== null) {
    return JSON.parse(user)
  } else {
    return null
  }
}

// Удаление данных из localStorage
export function deleteLocalStorage(name) {
  localStorage.removeItem(name)
}
