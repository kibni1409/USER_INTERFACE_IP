import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProductsThunk} from "../../../Redux/ProductsSlice/ProductsSlice";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import CardProduct from "./CardProduct";
import './ListProducts.css'
import {Spin} from "antd";

const ProductsStore = () => {
  const stateProducts = useSelector((state) => state.Products)
  let ElementsProducts = []
  stateProducts.products.map((el) => {
    ElementsProducts.push(<CardProduct key={el.id} el={el} />)
  })
  const dispatch = useDispatch()
  let user = getLocalStorage('user')
  useEffect(() => {
    if(user !== null){
      dispatch(getProductsThunk({productsID: user.products}))
    }
  }, [])
  return (
    <div className='ListProduct'>
      {stateProducts.loading === false ? ElementsProducts : <Spin />}
    </div>
  )
}

export default ProductsStore
