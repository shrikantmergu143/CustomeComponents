/* eslint-disable react/jsx-no-bind */
import React from 'react';

export default function Icon(props) {
    if(props?.button){
        return (
            <button type='button' onClick={props?.onClick} style={{...props?.style}} className={`icon_button btn ${props?.rounded && "rounded" }`}>
                <i className={`common_icon ${props?.className}`} />
            </button>
        )
    }
  return (
    <i style={{...props?.style}}  className={`common_icon ${props?.className}`} />
  )
}

export const IconButton  = (props) =>{
  return (
    <button {...props} className='icon_btn btn' >
      {props?.children}
    </button>
  )
}