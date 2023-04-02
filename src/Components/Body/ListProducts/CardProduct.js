import {Card} from "antd";
import './ListProducts.css'

const CardProduct = (props) => {
  return (
    <div className='CardProduct'>
      <Card title={'Наименование: ' + props.el.name}>
        <img className='ImageProduct' src={props.el.image} alt={props.el.image} />
        <p>Код товара: {props.el.code}</p>
        <p>Описание: {props.el.description}</p>
        <p>Срок хранения (Дней): {props.el.expiration}</p>
      </Card>
    </div>
  )
}

export default CardProduct
