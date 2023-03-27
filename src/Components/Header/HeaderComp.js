import Style from './HeaderComp.module.css'
import {Button} from "antd";
import {NavLink, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";
const HeaderComp = () => {
  let state = useSelector((state) => state.User)
  let user = localStorage.getItem('user')
  let navigate = useNavigate()
  let userParse = JSON.parse(user)
  useEffect(() => {

  }, [state])
  const ElementsButtons = () => {
    return (
      <div>
        <Button type={'primary'}>
          <NavLink to="/sing-in">SingIn</NavLink>
        </Button>
      </div>
    )
  }
  const ElementsUsers = () => {
    return (
      <div>
        <Button type={'primary'}>
          <NavLink to="/generate">QR</NavLink>
        </Button>
        <Button type={'primary'}>
          <NavLink to="/scan">Camera</NavLink>
        </Button>
        <Button type={'primary'}>
          <NavLink to="/store">Store</NavLink>
        </Button>
        <Button type={'primary'}>
          <NavLink to="/products">Products</NavLink>
        </Button>
        {userParse.login}
        <Button type={'primary'} onClick={() => {
          localStorage.removeItem('user')
          navigate('/sing-in')
        }}>
          LogOut
        </Button>
      </div>
    )
  }
  return (
    <div className={Style.headerStyle}>
      {userParse === null ? <ElementsButtons /> : <ElementsUsers />}
    </div>
  )
}

export default HeaderComp
