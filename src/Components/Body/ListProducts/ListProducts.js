import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProductsThunk} from "../../../Redux/ProductsSlice/ProductsSlice";

const ProductsStore = () => {
  const stateProducts = useSelector((state) => state.Products)
  let ElementsProducts = []
  stateProducts.products.map((el) => {
    ElementsProducts.push(<p key={el.id}>{el.name}</p>)
  })
  const dispatch = useDispatch()
  let user = localStorage.getItem('user')
  let userParse = JSON.parse(user)
  useEffect(() => {
    if(user !== null){
      dispatch(getProductsThunk({productsID: userParse.products}))
    }
  }, [])
  return (
    <div>
      {ElementsProducts}
    </div>
  )
}

export default ProductsStore
