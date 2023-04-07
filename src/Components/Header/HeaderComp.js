import Style from './HeaderComp.module.css'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../../Redux/WorkWithLocalStorage";
const HeaderComp = () => {
  let stateUser = useSelector((state) => state.User)
  let user = getLocalStorage('user')
  useEffect(() => {

  }, [stateUser])
  return (
    <div className={Style.headerStyle}>
      {user === null ? null : user.login}
    </div>
  )
}

export default HeaderComp
