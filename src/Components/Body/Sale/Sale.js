import QrReader from 'react-qr-scanner'
import {useEffect, useState} from "react";
import {Button} from "antd";
import './Scan.css'
import {useDispatch} from "react-redux";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import {getStoreThunk} from "../../../Redux/StoreSlice/StoreSlice";
import {getProductsThunk} from "../../../Redux/ProductsSlice/ProductsSlice";
const Sale= () => {
  let delay = 500
  const [resultScan, setResult] = useState()
  const [array, setArray] = useState([])
  const [camera, setCamera] = useState('true')
  const stateUserScan = getLocalStorage('user')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getStoreThunk({storeID: stateUserScan.store}))
    dispatch(getProductsThunk({productsID: stateUserScan.products}))
  }, [])
  useEffect(() => {
    if(camera === false) setCamera(true)
  }, [camera])

  const previewStyleCamera = {
    height: 300,
    width: 350,
    padding: 20
  }
  function handleScan(data){
    if(data){
        console.log(data.text)
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
        style={previewStyleCamera}
        onError={handleError}
        onScan={handleScan}
      /> : null }
      <p>
        {resultScan}
      </p>
      <div className='listScan'>
        {array}
      </div>
    </div>
  )
}

export default Sale
