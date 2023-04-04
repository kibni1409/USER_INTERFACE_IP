import QrReader from 'react-qr-scanner'
import {useEffect, useState} from "react";
import {Button} from "antd";
import './Scan.css'
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import {getStoreThunk} from "../../../Redux/StoreSlice/StoreSlice";
import {getProductsThunk} from "../../../Redux/ProductsSlice/ProductsSlice";
import {CheckOutlined} from "@ant-design/icons";
const Scan = () => {
  let delay = 1000
  const [result, setResult] = useState()
  const [array, setArray] = useState([])
  const [camera, setCamera] = useState('true')
  const stateStore = useSelector((state) => state.Store)
  const stateProducts = useSelector((state) => state.Products)
  const stateUser = getLocalStorage('user')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getStoreThunk({storeID: stateUser.store}))
    dispatch(getProductsThunk({productsID: stateUser.products}))
  }, [])
  useEffect(() => {
    if(camera === false) setCamera(true)
  }, [camera])
  let ElementsExpiration = []
  let ElementsExpirationArray = []
  useEffect(() => {
    if(stateProducts.products.length !== 0){
      stateStore.store.map((obj) => {
        let product = stateProducts.products.find((el) => el.code === obj.code)
        let date = new Date()
        date.setDate(date.getDate() + product.expiration)
        //date.toLocaleDateString("en-GB") === obj.data
        if (date.toLocaleDateString("en-GB") === '09/04/2023') {
          ElementsExpiration.push(...obj.arrayqr)
        } else {
          return {
            dateExp: date.toLocaleDateString("en-GB"),
            obj: obj.data,
            exp: product.expiration
          }
        }
      })
      ElementsExpiration.map((el) =>  ElementsExpirationArray.push(<span key={el}>{el}</span>))
      setArray(ElementsExpirationArray)
    }
  }, [stateProducts.products])


  const previewStyle = {
    height: 300,
    width: 350,
    padding: 20
  }
  function handleScan(data){
    if(data){
      setResult(data.text)
      let newArray = []
      array.map((el) => {
        if (el.key === data.text) {
          newArray.push(<span key={el.key}>{el.key}<CheckOutlined /></span>)
        } else {
          newArray.push(el)
        }
      })
      setCamera(false)
      setArray(newArray)
    }
  }
  function handleError(err){
    console.error(err)
  }
  return (
    <div className='Scan'>
      <Button onClick={() => setCamera(!camera)} >
        {camera === true ? 'Close' : 'Open'}
      </Button>
      {camera === true ? <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      /> : null }
      <p>
        {result}
      </p>
      <div className='listScan'>
        {array}
      </div>
    </div>
  )
}

export default Scan
