import {Card} from "antd";

const CardProduct = (props) => {
  return (
    <div>
      <Card title={props.el.name} style={{ width: 300, marginBottom: 20 }}>
        <p>Code: {props.el.code}</p>
        <p>Expiration (Days): {props.el.expiration}</p>
      </Card>
    </div>
  )
}

export default CardProduct
