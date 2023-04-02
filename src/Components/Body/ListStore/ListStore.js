import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStoreThunk} from "../../../Redux/StoreSlice/StoreSlice";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import './ListStore.css'
import CardStore from "./CardStore";
import {Spin} from "antd";

const ListStore = () => {
  const stateStore = useSelector((state) => state.Store)
  let ElementsStore = []
  stateStore.store.map((el) => {
    ElementsStore.push(<CardStore key={el.id} el={el} />)
  })
  const dispatch = useDispatch()
  let user = getLocalStorage('user')
  useEffect(() => {
    if(user !== null){
      dispatch(getStoreThunk({storeID: user.store}))
    }
  }, [])
  useEffect(() => {

  }, [stateStore.loading])
  return (
    <div className='ListStore'>
      {stateStore.loading === false ? ElementsStore : <Spin/>}
    </div>
  )
}

export default ListStore
