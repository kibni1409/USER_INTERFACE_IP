import Style from './Body.module.css'
const Body = (props) => {
  return (
    <div className={Style.contentStyle}>
      {props.children}
    </div>
  )
}

export default Body
