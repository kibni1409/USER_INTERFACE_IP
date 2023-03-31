import {Card} from "antd";

const CardProduct = (props) => {
  return (
    <div>
      <Card title={props.el.code} style={{ width: 300, marginBottom: 20 }}>
        <p>Data (Days): {props.el.data}</p>
        <p>Amount: {props.el.amount}</p>
      </Card>
    </div>
  )
}

export default CardProduct
