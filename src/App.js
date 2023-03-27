import React from 'react'
import Style from "./App.module.css"
import HeaderComp from "./Components/Header/HeaderComp";
import Body from "./Components/Body/Body"
import Footer from "./Components/Footer/Footer"
import SingIn from "./Components/Body/SingIn/SingIn";
import {Outlet, Route, Routes} from "react-router-dom";
import ListStore from "./Components/Body/ListStore/ListStore";
import ListProducts from "./Components/Body/ListProducts/ListProducts";
import Scan from "./Components/Scan";
import GenerateQR from "./Components/GenetateQR";

function App() {
  return (
    <div className={Style.App}>
      <HeaderComp />
      <Body>
        <Outlet />
        <Routes>
          <Route path={'/sing-in'} element={<SingIn />} />
          <Route path={'/scan'} element={<Scan />} />
          <Route path={'/generate'} element={<GenerateQR />} />
          <Route path={'/store'} element={<ListStore />} />
          <Route path={'/products'} element={<ListProducts />} />
        </Routes>
      </Body>
      <Footer>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </div>
  )
}

export default App
