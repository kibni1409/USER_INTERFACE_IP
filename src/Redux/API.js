import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://192.168.0.6:8081',
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
    return instance.get('/store/' + storeID).then((response) => response.data)
  },
  putStore(storeArray, totalCount, nextID, storeID) {
    return instance.put('/store/edit/', {
      storeID,
      storeArray,
      totalCount,
      nextID
    }).then((response) => response.data)
  }
}

export const ProductsAPI = {
  getProducts(productsID)  {
    return instance.get('/products/' + productsID).then((response) => response.data.products)
  }
}
