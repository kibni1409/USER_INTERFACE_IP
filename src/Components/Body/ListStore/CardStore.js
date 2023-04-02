import {Card} from "antd";
import './ListStore.css'

const CardProduct = (props) => {
  return (
    <div className='CardStore'>
      <Card title={'Наименование: ' + props.el.name}>
        <p>Код товара: {props.el.code}</p>
        <p>Дата поступления: {props.el.data}</p>
        <p>Кол-во: {props.el.amount}</p>
      </Card>
    </div>
  )
}

export default CardProduct
