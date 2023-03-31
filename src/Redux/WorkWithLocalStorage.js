export function SetLocalStorage(name, data) {
  try {
    localStorage.setItem(name, data)
  } catch (err) {
    throw Error(err.message)
  }
}

export function getLocalStorage(name) {
  let user = localStorage.getItem(name)
  if (user !== 'undefined' && user !== null) {
    return JSON.parse(user)
  } else {
    return null
  }
}

export function deleteLocalStorage(name) {
  localStorage.removeItem(name)
}
