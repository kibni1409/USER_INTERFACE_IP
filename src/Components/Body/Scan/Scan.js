import QrReader from 'react-qr-scanner'
import { useState} from "react";
import {Button} from "antd";
import './Scan.css'
const Scan = () => {
  let delay = 1000
  const [result, setResult] = useState()
  const [camera, setCamera] = useState('true')
  const previewStyle = {
    height: 300,
    width: 350,
    padding: 20
  }
  function handleScan(data){
    if(data) setResult(data.text)
  }
  function handleError(err){
    console.error(err)
  }
  return (
    <div className='Scan'>
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
