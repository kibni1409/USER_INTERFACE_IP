import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.0.8:8081',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const UserAPI = {
  SingIn(login, password) {
    return instance
      .put('/users', {
        login,
        password,
      })
      .then((response) => response.data)
  }
}

export const StoreAPI = {
  getStore(storeID) {
    return instance.get('/store/' + storeID).then((response) => response.data.store)
  }
}

export const ProductsAPI = {
  getProducts(productsID)  {
    return instance.get('/products/' + productsID).then((response) => response.data.products)
  }
}
