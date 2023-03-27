import QrReader from 'react-qr-scanner'
import { useState} from "react";
import {Button} from "antd";
const Scan = () => {
  let delay = 100
  const [result, setResult] = useState()
  const [camera, setCamera] = useState('true')
  const previewStyle = {
    height: 540,
    width: 620,
  }
  function handleScan(data){
    if(data) setResult(data.text)
  }
  function handleError(err){
    console.error(err)
  }
  return (
    <div>
      <Button onClick={() => setCamera(!camera)} >
        {camera === true ? 'Close' : 'Open'}
      </Button>
      {camera === true ? <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      /> : null }
      <p>{result}</p>
    </div>
  )
}

export default Scan
