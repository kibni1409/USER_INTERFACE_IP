import {Card} from "antd";
import './ListStore.css'

const CardProduct = (props) => {
  // Массив списка продкутов
  let elemtnts = props.el.arrayqr.map((el) => <p key={el} style={{margin: 0}}>{el}</p>)

  return (
    <div className='CardStore'>
      <Card title={'Наименование: ' + props.el.name}>
        <p>Код товара: {props.el.code}</p>
        <p>Дата поступления: {props.el.data}</p>
        <p>Кол-во принятых: {props.el.amount}</p>
        <p>Остаток: {props.el.arrayqr.length}</p>
        <>{elemtnts}</>
      </Card>
    </div>
  )
}

export default CardProduct
