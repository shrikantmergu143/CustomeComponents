/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'

export default function ButtonPage(props) {
  const [load, setload] = useState(false);
  useEffect(() => {
    setTimeout(()=>setload(false), 1000)
  }, [load === true]);
  function callHandleOnClick(e){
    setload(true);
    if(props?.onClick) {
      props?.onClick(e);
    }
  }
  return (
    <div className="swal-button-container">
        <div className={`position-relative `}>
            <button onClick={callHandleOnClick} className={props?.className}>{props?.children}</button>
            <div className={`swal-button__loader ${load ? 'opacity-1':'opacity-0'}`}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
  )
}