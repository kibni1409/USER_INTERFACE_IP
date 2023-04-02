import React, {useEffect} from 'react'
import "./App.css"
import HeaderComp from "./Components/Header/HeaderComp";
import Body from "./Components/Body/Body"
import Footer from "./Components/Footer/Footer"
import SingIn from "./Components/Body/SingIn/SingIn";
import {Outlet, Route, Routes} from "react-router-dom";
import ListStore from "./Components/Body/ListStore/ListStore";
import ListProducts from "./Components/Body/ListProducts/ListProducts";
import Scan from "./Components/Body/Scan/Scan";
import GenerateQR from "./Components/Body/AddStore/GenetateQR";
import MenuJS from "./Components/Body/MenuJS/MenuJS";
import AddProduct from "./Components/Body/AddProduct/AddProduct";
import {getLocalStorage} from "./Redux/WorkWithLocalStorage";


export const RouteSignIN = '/sign-in'
export const RouteStore = '/store'
export const RouteStoreAdd = '/store-add'
export const RouteStoreDelete = '/store-delete'
export const RouteProducts = '/products'
export const RouteProductsAdd = '/products-add'
export const RouteProductsDelete = '/products-delete'
function App() {
  const user = getLocalStorage('user')
  useEffect(() => {

  }, [user])
  return (
    <div className='App'>
      <HeaderComp/>
      <Body>
        {user !== null ? <MenuJS/> : null}
        <Outlet />
        <Routes>
          <Route path={'/'} element={<SingIn />} />
          <Route path={RouteSignIN} element={<SingIn />} />
          <Route path={RouteStoreDelete} element={<Scan />} />
          <Route path={RouteStoreAdd} element={<GenerateQR />} />
          <Route path={RouteProductsAdd} element={<AddProduct />} />
          <Route path={RouteStore} element={<ListStore />} />
          <Route path={RouteProducts} element={<ListProducts />} />
        </Routes>
      </Body>
      <Footer>
        Ant Design ©2023
      </Footer>
    </div>
  )
}

export default App
