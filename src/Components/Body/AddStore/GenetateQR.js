import {QRCodeSVG} from 'qrcode.react';
import {Button, Form, InputNumber, Select} from "antd";
import {createRef, forwardRef, useEffect, useState} from "react";
import './GenerateQR.css'
import {useReactToPrint} from "react-to-print";
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import {getProductsThunk} from "../../../Redux/ProductsSlice/ProductsSlice";
import {getStoreThunk, putStoreThunk} from "../../../Redux/StoreSlice/StoreSlice";

const GenerateQR = () => {

  let dateNew = new Date() // Свежая дата
  const dispatch = useDispatch() // Диспетчер логики
  const stateUser = getLocalStorage('user') // Данные пользователя
  const stateProducts = useSelector((state) => state.Products) // Продукты пользователя
  const stateStore = useSelector((state) => state.Store) // Хранилище пользователя

  // Список продкутов для селектора
  let SelectorOptions = []
  stateProducts.products.map((el) =>  SelectorOptions.push({ value: el.name, label: el.name }))

  const [code, setCode] = useState('') // Код продукта
  const [date, setDate] = useState(dateNew) // Дата
  const [value, setValue] = useState(1) // Колличество

  // Печать документа
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  })

  // Получение данных пользователя
  useEffect(() => {
    dispatch(getProductsThunk({productsID: stateUser.products}))
    dispatch(getStoreThunk( {storeID: stateUser.store}))
  }, [])

  // Добавить в хранилище новые товары
  function AddStore() {

    let product = stateProducts.products.find((el) => el.name === code) // Продукт, который мы выбрали
    let dateNew = new Date() // свежая дата

    // Массив продуктов
    let arrayProductCode = []
    for ( let i = 0; i < value; i++ ){
      let dataForArray = code + '_' + (i+1) + ' ' + date.toLocaleDateString("en-GB")
      arrayProductCode.push(dataForArray)
    }

    // Шаблон объекта хранилища
    let object = {
      id: stateStore.nextID,
      name: code,
      code: product.code,
      data: dateNew.toLocaleDateString("en-GB"),
      amount: value,
      arrayqr: arrayProductCode
    }

    // Новое хранилище
    let newArray = [...stateStore.store, object]
    dispatch(putStoreThunk({
      storeArray: newArray,
      totalCount: newArray.length,
      nextID: stateStore.nextID + 1,
      storeID: stateUser.store
    }))
  }

  const handleChange = (value) => {
    setCode(value)
    let elem = stateProducts.products.find((el) => el.name === value)
    date.setDate(date.getDate() + elem.expiration)
  }
  const onFinish = (values) => {
    console.log('Success:', values);
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  function OnChangeNumber(e){
    setValue(e)
  }

  // Форма для печати
  const FancyButton = forwardRef((props, ref) => (
    <div ref={ref} className="FancyButton">
      {props.children}
    </div>
  ));

  // Массив для печати
  let ElementToPrint = []
  for (let i = 0; i < value; i++){
    let newCode = code + '_' + i
    ElementToPrint.push( <span key={i}><QRCodeSVG value={newCode}/><p><span>{code + '_' + (i+1)} </span><span>{date.toLocaleDateString("en-GB")}</span></p></span>)
  }

  // Яколь для печати документа
  const ref = createRef();

  return (
    <div className='Form'>
      <h3>Добавление товара</h3>
      <Form
        name="basic"
        className='FormInputs'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className='label'
          label="Наименование товара"
          name="name"
          rules={[{ required: true, message: 'Пожалуйста, укажите товар!' }]}
        >
          <Select
            onChange={handleChange}
            options={SelectorOptions}
          />
        </Form.Item>
        <Form.Item
          label="Кол-во товара"
          name="number"
          rules={[{ required: true, message: 'Пожалуйста, укажите кол-во!' }]}
        >
          <InputNumber onChange={OnChangeNumber}/>
        </Form.Item>

      </Form>
      <QRCodeSVG value={code} className='FormQR'/>
      <p>
        <span>{code} </span>
        <span>{date.toLocaleDateString("en-GB")} </span>
      </p>
      <div style={ {display: 'none'}}>
        <FancyButton ref={ref}>
          {ElementToPrint}
        </FancyButton>
      </div>
      {code !== '' ? <Button onClick={() => {
        handlePrint()
        AddStore()
      }}>  Print </Button> : null}
    </div>
  )
}

export default GenerateQR
