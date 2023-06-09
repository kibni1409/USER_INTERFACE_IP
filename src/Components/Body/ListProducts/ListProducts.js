import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProductsThunk} from "../../../Redux/ProductsSlice/ProductsSlice";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import CardProduct from "./CardProduct";
import './ListProducts.css'
import {Spin} from "antd";

const ProductsStore = () => {

  const stateProducts = useSelector((state) => state.Products) // Данные о продуктах
  const dispatch = useDispatch() // Диспетчер логики
  let user = getLocalStorage('user') // Данные пользователя

  // Массив карточек продкута
  let ElementsProducts = []
  stateProducts.products.map((el) => {
    ElementsProducts.push(<CardProduct key={el.id} el={el} />)
  })

  // Получение данных о продуктах
  useEffect(() => {
    if(user !== null){
      dispatch(getProductsThunk({productsID: user.products}))
    }
  }, [])

  return (
    <div className='ListProduct'>
      {stateProducts.loading === false ? ElementsProducts.reverse() : <Spin />}
    </div>
  )
}

export default ProductsStore
