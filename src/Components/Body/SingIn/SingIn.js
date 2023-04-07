import {Button, Checkbox, Form, Input} from "antd";
import {SingInThunk} from "../../../Redux/UserSlice/UserSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import {useEffect} from "react";
import {RouteStore} from "../../../App";

const SingIn = () => {
  const navigate = useNavigate() // Навигатор
  const dispatch= useDispatch() // Диспетчер
  const user = getLocalStorage('user') // Инфо о пользователе

  // Перевоз с формы на страницу хранилища
  useEffect(() => {
    if (user !== null){
      navigate(RouteStore)
    }
  }, [])

  // Отправка на сервер данных пользователя
  const onFinish = (values) => {
    dispatch(SingInThunk({login:values.login, password:values.password}))
    navigate(RouteStore)
  };

  // Ошибка при заполнении полей
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
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
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Логин"
          name="login"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите логин!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите пароль!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SingIn
