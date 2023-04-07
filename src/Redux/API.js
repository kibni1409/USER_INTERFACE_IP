import axios from 'axios'

// Настройки запросов
const instance = axios.create({
  baseURL: 'http://192.168.0.6:8081',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Пользовательские запросы
export const UserAPI = {
  // Авторизация
  SingIn(login, password) {
    return instance
      .put('/users', {
        login,
        password,
      })
      .then((response) => response.data)
  }
}

// Запросы хранилища
export const StoreAPI = {
  // Получить данные о хранилище
  getStore(storeID) {
    return instance.get('/store/' + storeID).then((response) => response.data)
  },
  // Изменить данные о хранилище
  putStore(storeArray, totalCount, nextID, storeID) {
    return instance.put('/store/edit/', {
      storeID,
      storeArray,
      totalCount,
      nextID
    }).then((response) => response.data)
  }
}

// Продуктовые запросы
export const ProductsAPI = {
  // Получить данные о продктах
  getProducts(productsID)  {
    return instance.get('/products/' + productsID).then((response) => response.data)
  },
  // Изменить данные о продуктах
  putProducts(productsArray, totalCount, nextID, productsID) {
    return instance.put('/products/edit/', {
      productsID,
      productsArray,
      totalCount,
      nextID
    }).then((response) => response.data)
  }
}
