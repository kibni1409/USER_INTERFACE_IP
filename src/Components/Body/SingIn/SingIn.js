import {Button, Checkbox, Form, Input} from "antd";
import {SingInThunk} from "../../../Redux/UserSlice/UserSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import {useEffect} from "react";
import {RouteStore} from "../../../App";

const SingIn = () => {
  const navigate = useNavigate()
  const dispatch= useDispatch()
  const user = getLocalStorage('user')
  useEffect(() => {
    if (user !== null){
      navigate(RouteStore)
    }
  }, [])
  const onFinish = (values) => {
    dispatch(SingInThunk({login:values.login, password:values.password}))
    navigate(RouteStore)
  };
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
          label="Login"
          name="login"
          rules={[
            {
              required: true,
              message: 'Please input your login!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
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
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SingIn
