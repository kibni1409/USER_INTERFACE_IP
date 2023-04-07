import QrReader from 'react-qr-scanner'
import {useEffect, useState} from "react";
import {Button, Spin} from "antd";
import './Sale.css'
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import {getStoreThunk, putStoreThunk} from "../../../Redux/StoreSlice/StoreSlice";
import {getProductsThunk} from "../../../Redux/ProductsSlice/ProductsSlice";
import {CheckOutlined} from "@ant-design/icons";
const Sale= () => {

  let delay = 500 // Интервал сканирования
  const [resultScan, setResult] = useState() //Результат сканирования
  const [arrayString, setArrayString] = useState([]) // Массив отсканированного
  const [array, setArray] = useState([]) // Массив отсканированного
  const [arrayObj, setArrayObj] = useState([]) // Массив объектов сканирования
  const [loadingStore, setLoadingStore] = useState(true) // Загрузка данных
  const [camera, setCamera] = useState('true') // Режим камеры
  const stateUserScan = getLocalStorage('user') // Данные пользователя
  const stateStore = useSelector((state) => state.Store) // Данные пользователя
  const dispatch = useDispatch() // Диспетчер логики
  const previewStyleCamera = { // Настройки камеры
    height: 300,
    width: 350,
    padding: 20
  }

  // Получение данных пользователя
  useEffect(() => {
    dispatch(getStoreThunk({storeID: stateUserScan.store}))
    dispatch(getProductsThunk({productsID: stateUserScan.products}))
  }, [])

  // Контроль загрузки
  useEffect(() => {
    setLoadingStore(stateStore.loading)
  }, [stateStore.loading])

  // Переключение камеры
  useEffect(() => {
    if(camera === false) setCamera(true)
  }, [camera])

  // Удачное сканирование камеры
  function handleScan(data){
    if (data) {
      // Сохраняем результат
      setResult(data.text)
      // Новые массивы
      let Array = array
      let ArrayObj = arrayObj
      let ArrayString = arrayString
      // Находим совпадение с результатом сканирования
      stateStore.store.map((obj) => {
        if(obj.arrayqr.includes(data.text) && !arrayString.includes(data.text)){
          Array.push(<span key={data.text}>{data.text}<CheckOutlined/></span>)
          ArrayString.push(data.text)
          if (!arrayObj.includes(obj)){
            ArrayObj.push(obj)
          }
        }
      })
      setCamera(false)
      setArray(Array)
      setArrayObj(ArrayObj)
      setArrayString(ArrayString)
    }
  }

  // Неудачное сканирование камеры
  function handleError(err){
    console.error(err)
  }

  // Продажа продукта
  function SaleStore() {

    // Изменение кол-во остатков у продукта
    let newObjects = arrayObj.map((obj) => {
      let arrayQR = obj.arrayqr.filter((qr) => !arrayString.includes(qr))
      return {
        ...obj,
        arrayqr: arrayQR,
      }
    })

    // Продукты, которые не присутствуют в списке покупок
    let newState = stateStore.store.filter((obj) => !arrayObj.includes(obj))

    // Соединяем продукты и измененные продукты
    let newStore = [...newState, ...newObjects]

    // Отправляем на сервер изменения
    dispatch(putStoreThunk({
      storeArray: newStore,
      totalCount: stateStore.totalCount,
      nextID: stateStore.nextID,
      storeID:  stateUserScan.store
    }))

    // Обнуление массивов и формы
    setArray([])
    setArrayObj([])
    setArrayString([])
  }

  return (
    <div className='Sale'>
      {loadingStore === true
        ? <Spin/>
        : <>
          <Button onClick={() => setCamera(!camera)}>
            {camera === true ? 'Close' : 'Open'}
          </Button>
          {camera === true ? <QrReader
            delay={delay}
            style={previewStyleCamera}
            onError={handleError}
            onScan={handleScan}
          /> : null}
          <p>
            {resultScan}
          </p>
          <div className='listSale'>
            {array}
          </div>
          {array.length !== 0 ? <Button onClick={SaleStore}>Продать</Button> : null}
        </>}
    </div>
  )
}

export default Sale
