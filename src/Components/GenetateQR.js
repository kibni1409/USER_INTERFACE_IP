import {QRCodeSVG} from 'qrcode.react';
import {Button, Input, InputNumber} from "antd";
import {createRef, forwardRef, useState} from "react";

import {useReactToPrint} from "react-to-print";


const GenerateQR = () => {
  const [code, setCode] = useState('')
  const [value, setValue] = useState(1)
  const handlePrint = useReactToPrint({
    content: () => ref.current,
  });
  function OnChange(e){
    setCode(e.target.value)
  }
  function OnChangeNumber(e){
    setValue(e)
  }
  const FancyButton = forwardRef((props, ref) => (
    <div ref={ref} className="FancyButton">
      {props.children}
    </div>
  ));
  let ElementToPrint = []
  for (let i = 0; i < value; i++){
    ElementToPrint.push( <p><QRCodeSVG value={code}/><p>{code}</p></p>)
  }
  const ref = createRef();
  return (
    <div>
      <Input onChange={OnChange}></Input>
      <InputNumber onChange={OnChangeNumber} />
      <QRCodeSVG value={code}/>
      <p>{code}</p>
      <div style={ {display: 'none'}}>
        <FancyButton ref={ref}>
          {ElementToPrint}
        </FancyButton>
      </div>
      <Button onClick={handlePrint}>  Print </Button>
    </div>
  )
}

export default GenerateQR
