import QrReader from 'react-qr-scanner'
import {useEffect, useState} from "react";
import {Button} from "antd";
import './Scan.css'
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import {getStoreThunk, putStoreThunk} from "../../../Redux/StoreSlice/StoreSlice";
import {getProductsThunk} from "../../../Redux/ProductsSlice/ProductsSlice";
import {CheckOutlined} from "@ant-design/icons";
const Scan = () => {
  // Переменные
  let delay = 1000 // Интервал сканирования
  const [result, setResult] = useState() // Результат сканирования
  const [array, setArray] = useState([]) // Массив продуктов для списания
  const [arrayExp, setArrayExp] = useState([]) // Массив отсканированных продуктов
  const [arrayObj, setArrayObj] = useState([]) // Массив объектов для списания
  const [camera, setCamera] = useState('true') // Режим камеры
  const stateStore = useSelector((state) => state.Store) // Стайт хранилища
  const stateProducts = useSelector((state) => state.Products) // Стайт продуктов
  const stateUser = getLocalStorage('user')  // Данные пользователя
  const dispatch = useDispatch() // Диспетчер долистики

  // Получение данных хранилища и продуктов пользователя
  useEffect(() => {
    dispatch(getStoreThunk({storeID: stateUser.store}))
    dispatch(getProductsThunk({productsID: stateUser.products}))
  }, [])
  // Перезарядка камеры
  useEffect(() => {
    if(camera === false) setCamera(true)
  }, [camera])
  // Нахождение просрочки
  let ElementsExpiration = []
  let ElementsExpirationArray = []
  let ObjectExpiration = []
  useEffect(() => {
    if(stateProducts.products.length !== 0){
      // Перебираем все хранилище
      stateStore.store.map((obj) => {
        // Находим информацию о продукте
        let product = stateProducts.products.find((el) => el.code === obj.code)
        // Дата срока хранения и сегодня
        let dateNow = new Date()
        let dateStore = new Date(obj.data)
        dateStore.setDate(dateStore.getDate() + product.expiration)
        // Если сегодняшня дата больше, либо равно дате просрочки, то добавляем в массив
        if (dateNow >= dateStore) {
          ElementsExpiration.push(...obj.arrayqr)
          ObjectExpiration.push(obj)
        }
      })
      ElementsExpiration.map((el) =>  ElementsExpirationArray.push(<span key={el}>{el}</span>))
      setArray(ElementsExpirationArray)
      setArrayObj(ObjectExpiration)
    }
  }, [stateProducts.products])

  // Размеры камеры
  const previewStyle = {
    height: 300,
    width: 350,
    padding: 20
  }

  // Сканирование
  function handleScan(data){
    // Если сканер что то считал
    if(data){
      // Сохраняем результат
      setResult(data.text)
      // Новые массивы
      let newArrayExp = arrayExp
      let newArray = []
      // Находим совпадение с результатом сканирования
      array.map((el, index) => {
        if (el.key === data.text) {
          newArrayExp.push(<span key={el.key}>{el.key}<CheckOutlined /></span>)
        } else {
          newArray.push(el)
        }
      })
      setCamera(false)
      setArray(newArray)
      setArrayExp(newArrayExp)
    }
  }

  // Списание
  function Expiration() {
    // Создаем массив в котором нет списанных продуктов
    let newState = stateStore.store.filter((el) => !arrayObj.includes(el))
    // Передаем диспетчеру новый стейт
    dispatch(putStoreThunk({
      storeArray: newState,
      totalCount: newState.length,
      nextID: stateStore.nextID,
      storeID: stateUser.store
    }))
    // Обнуляем массивы
    setArray([])
    setArrayExp([])
    setArrayObj([])
  }

  // Ошибка открытия камеры
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
        {[...arrayExp,...array]}
      </div>
       {arrayExp.length !== 0 && array.length === 0 ? <Button onClick={Expiration} >Списать</Button> : null}
    </div>
  )
}

export default Scan
