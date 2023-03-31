import {Button, Form, Input, InputNumber, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getProductsThunk} from "../../../Redux/ProductsSlice/ProductsSlice";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import './AddProduct.css'
const AddProduct = () => {
  const user = getLocalStorage('user')
  const stateProduct = useSelector((state) => state.Products)
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage();
  const error = (text) => {
    messageApi.open({
      type: 'error',
      content: text,
    });
  };
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'success',
    });
  };
  useEffect(() => {
    dispatch(getProductsThunk({productsID: user.products}))
  }, [])
  const onFinish = (values) => {
    let resName = stateProduct.products.find((el) => el.name === values.name)
    let resCode = stateProduct.products.find((el) => el.code === values.code)
    if (resCode === undefined && resName === undefined) {
      success();
    } else {
      error('Name or code is already in use')
    }
  };
  const onFinishFailed = (errorInfo) => {
    error(errorInfo);
  };
  return (
    <div className='AddProduct'>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Code"
          name="code"
          rules={[
            {
              required: true,
              message: 'Please input code!',
            },
          ]}
        >
          <InputNumber
            style={{
              width: 150,
              textAlign: "center"
            }}
            keyboard={true}
            max={99999999999}/>
        </Form.Item>
        <Form.Item
          label="Expiration"
          name="expiration"
          rules={[
            {
              required: true,
              message: 'Please input expiration!',
            },
            {
              type: 'number',
              message: 'Please input number!',
            },
          ]}
        >
          <InputNumber min={1} max={60} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddProduct
