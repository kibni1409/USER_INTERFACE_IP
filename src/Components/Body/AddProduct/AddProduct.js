import {Button, Form, Input, InputNumber, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getProductsThunk, putProductsThunk} from "../../../Redux/ProductsSlice/ProductsSlice";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import './AddProduct.css'
const AddProduct = () => {
  const stateUser = getLocalStorage('user') // Информация о пользователе
  const stateProduct = useSelector((state) => state.Products) // Информация о продуктах пользователя
  const dispatch = useDispatch() // Диспетчер
  const [messageApi, contextHolder] = message.useMessage() // Всплывающее сообщение

  // Запрос на получение данных о продуктах
  useEffect(() => {
    dispatch(getProductsThunk({productsID: stateUser.products}))
  }, [])

  // Уведомление об ошибке
  const error = (text) => {
    messageApi.open({
      type: 'error',
      content: text,
    })
  }

  // Уведомление об успехе
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'success',
    })
  }

  // Успешное заполнение формы
  const onFinish = (values) => {
    let resName = stateProduct.products.find((el) => el.name === values.name)
    let resCode = stateProduct.products.find((el) => el.code === values.code)
    if (resCode === undefined && resName === undefined) {
      let image = values.image ? values.image : 'https://image-cdn.kazanexpress.ru/c3msbo5cnbi0surbve20/original.jpg'
      let newProduct =  {
          id: stateProduct.totalCount,
          name: values.name,
          code: values.code,
          expiration: values.expiration,
          description: values.description,
          image: image
        }
      success()
      dispatch(putProductsThunk({
        productsArray: [...stateProduct.products, newProduct],
        totalCount: stateProduct.totalCount + 1,
        nextID: stateProduct.totalCount + 1 ,
        productsID: stateUser.products
      }))
    } else {
      error('Продукт с таким именем уже существует')
    }
  }

  // Неудачное заполнение формы
  const onFinishFailed = (errorInfo) => {
    error(errorInfo)
  }

  return (
    <div className='AddProduct'>
      <h2>Создание товара</h2>
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
          label="Наименование"
          name="name"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, придумайте название!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Картинка (url)"
          name="image"
          rules={[
            {
              type: 'url',
              warningOnly: true,
              message: 'Должен быть URL адрес изображения'
            },
            {
              type: 'string',
              min: 6,
              message: 'Минимальная длина 6'
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Описание товара"
          name="description"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, опишите товар!',
            },
          ]}
        >
          <Input.TextArea autoSize={{minRows: 2, maxRows: 6}}/>
        </Form.Item>
        <Form.Item
          label="Код продукта"
          name="code"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, придумайте код товара!',
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
          label="Скрок хранения"
          name="expiration"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите срок хранения!',
            },
            {
              type: 'number',
              message: 'Пожалуйста, используйте числа!',
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
            Создать
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default AddProduct
