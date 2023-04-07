import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getStoreThunk} from "../../../Redux/StoreSlice/StoreSlice";
import {getLocalStorage} from "../../../Redux/WorkWithLocalStorage";
import './ListStore.css'
import CardStore from "./CardStore";
import {Spin} from "antd";

const ListStore = () => {
  const stateStore = useSelector((state) => state.Store) // Информация о хранилище
  const dispatch = useDispatch() // Диспетчер логики
  let user = getLocalStorage('user') //Данные пользователя

  // Массив карточек хранилища
  let ElementsStore = []
  stateStore.store.map((el) => {
    ElementsStore.push(<CardStore key={el.id} el={el} />)
  })

  // Получение данных о хранилище
  useEffect(() => {
    if(user !== null){
      dispatch(getStoreThunk({storeID: user.store}))
    }
  }, [])

  // Обновиться после загрузки
  useEffect(() => {

  }, [stateStore.loading])


  return (
    <div className='ListStore'>
      {stateStore.loading === false ? ElementsStore : <Spin/>}
    </div>
  )
}

export default ListStore
