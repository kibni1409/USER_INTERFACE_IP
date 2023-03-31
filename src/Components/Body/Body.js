import './Body.css'
const Body = (props) => {
  return (
    <div className='contentStyle'>
      {props.children}
    </div>
  )
}

export default Body
