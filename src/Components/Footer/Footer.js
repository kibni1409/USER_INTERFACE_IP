import Style from './Footer.module.css'
const Footer= (props) => {
  return (
    <div className={Style.footerStyle}>
      {props.children}
    </div>
  )
}

export default Footer
