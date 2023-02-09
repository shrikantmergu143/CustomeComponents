/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';

export function ButtonPage(props) {
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
export default function Button(props) {
  return (
    <button disabled={props?.disabled} type={props?.type} hidden={props?.hidden === true?true:false} onClick={props?.onClick} className={`button ${props?.className?props?.className:""} ${props?.block === true ?"button--block":""} ${props?.btntype?props?.btntype:""}`} >
        <span className="button__text">{props?.children}</span>
    </button>
  )
}
Button.propTypes = {
  type:PropTypes?.string,
  onClick:PropTypes?.func,
  children:PropTypes?.any,
  btntype:PropTypes?.any,
  block:PropTypes?.bool,
  hidden:PropTypes?.bool,
  disabled:PropTypes?.bool
};
Button.defaultProps = {
  type:"button",
  btntype:"button-primary",
  hidden:false,
  onClick:()=>{},
  block:false,
  disabled:false
}