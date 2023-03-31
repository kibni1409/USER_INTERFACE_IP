import {QRCodeSVG} from 'qrcode.react';
import {Button, Form, InputNumber, Select} from "antd";
import {createRef, forwardRef, useEffect, useState} from "react";
import './GenerateQR.css'
import {useReactToPrint} from "react-to-print";
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage} from "../Redux/WorkWithLocalStorage";
import {getProductsThunk} from "../Redux/ProductsSlice/ProductsSlice";


const GenerateQR = () => {
  let dateNew = new Date()
  const dispatch = useDispatch()
  const stateUser = getLocalStorage('user')
  const stateProducts = useSelector((state) => state.Products)
  let SelectorOptions = []
  stateProducts.products.map((el) =>  SelectorOptions.push({ value: el.name, label: el.name }))
  const [code, setCode] = useState('')
  const [date, setDate] = useState(dateNew)
  const [value, setValue] = useState(1)
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  })
  useEffect(() => {
    dispatch(getProductsThunk({productsID: stateUser.products}))
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
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name products"
          name="name"
          rules={[{ required: true, message: 'Please input name product!' }]}
        >
          <Select
            style={{ width: 120 }}
            onChange={handleChange}
            options={SelectorOptions}
          />
        </Form.Item>
        <Form.Item
          label="Number products"
          name="number"
          rules={[{ required: true, message: 'Please input number!' }]}
        >
          <InputNumber onChange={OnChangeNumber}/>
        </Form.Item>

      </Form>
      <QRCodeSVG value={code}/>
      <p>
        <span>{code} </span>
        <span>{date.toLocaleDateString("en-GB")} </span>
      </p>
      <div style={ {display: 'none'}}>
        <FancyButton ref={ref}>
          {ElementToPrint}
        </FancyButton>
      </div>
      {code !== '' ? <Button onClick={handlePrint}>  Print </Button> : null}
    </div>
  )
}

export default GenerateQR
