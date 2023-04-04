import {QRCodeSVG} from 'qrcode.react';
import {Button, Form, InputNumber, Select} from "antd";
import {createRef, forwardRef, useEffect, useState} from "react";
import './GenerateQR.css'
import {useReactToPrint} from "react-to-print";
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import {getProductsThunk} from "../../../Redux/ProductsSlice/ProductsSlice";
import {getStoreThunk, putStoreThunk} from "../../../Redux/StoreSlice/StoreSlice";
import store from "../../../Redux/Store";


const GenerateQR = () => {
  let dateNew = new Date()
  const dispatch = useDispatch()
  const stateUser = getLocalStorage('user')
  const stateProducts = useSelector((state) => state.Products)
  const stateStore = useSelector((state) => state.Store)
  let SelectorOptions = []
  stateProducts.products.map((el) =>  SelectorOptions.push({ value: el.name, label: el.name }))
  const [code, setCode] = useState('')
  const [date, setDate] = useState(dateNew)
  const [value, setValue] = useState(1)
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  })
  function AddStore() {
    let product = stateProducts.products.find((el) => el.name === code)
    let dateNew = new Date()
    let arrayProductCode = []
    for ( let i = 0; i < value; i++ ){
      let dataForArray = code + '_' + (i+1) + ' ' + date.toLocaleDateString("en-GB")
      arrayProductCode.push(dataForArray)
    }
    let object = {
      id: stateStore.nextID,
      name: code,
      code: product.code,
      data: dateNew.toLocaleDateString("en-GB"),
      amount: value,
      arrayqr: arrayProductCode
    }
    let newArray = [...stateStore.store, object]
    dispatch(putStoreThunk({
      storeArray: newArray,
      totalCount: newArray.length,
      nextID: stateStore.nextID + 1,
      storeID: stateUser.store
    }))
    // console.log(newArray, newArray.length, stateStore.nextID + 1, stateUser.store)
  }
  useEffect(() => {
    dispatch(getProductsThunk({productsID: stateUser.products}))
    dispatch(getStoreThunk( {storeID: stateUser.store}))
  }, [])
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
  const FancyButton = forwardRef((props, ref) => (
    <div ref={ref} className="FancyButton">
      {props.children}
    </div>
  ));
  let ElementToPrint = []
  for (let i = 0; i < value; i++){
    let newCode = code + '_' + i
    ElementToPrint.push( <span key={i}><QRCodeSVG value={newCode}/><p><span>{code + '_' + (i+1)} </span><span>{date.toLocaleDateString("en-GB")}</span></p></span>)
  }
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
