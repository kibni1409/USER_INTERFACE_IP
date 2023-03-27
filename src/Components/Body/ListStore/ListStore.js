import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStoreThunk} from "../../../Redux/StoreSlice/StoreSlice";

const ListStore = () => {
  const stateStore = useSelector((state) => state.Store)
  let ElementsStore = []
  stateStore.store.map((el) => {
    ElementsStore.push(<p key={el.id}>{el.data}</p>)
  })
  const dispatch = useDispatch()
  let user = localStorage.getItem('user')
  let userParse = JSON.parse(user)
  useEffect(() => {
    if(user !== null){
      dispatch(getStoreThunk({storeID: userParse.store}))
    }
  }, [])
  return (
    <div>
      {ElementsStore}
    </div>
  )
}

export default ListStore
