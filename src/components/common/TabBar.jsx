/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import Icon from './Icon'
export const ListTab = (props) =>{
    const onHandleClick = () =>{
        props?.onClick(props?.item?.title)
    }
    return(
        <li className="nav-item">
            <button type='button' className={`btn nav-link ${props?.select === props?.item?.title && " bg-secondary active text-capitalize"}`} onClick={onHandleClick}>
               {props?.item?.icon && <Icon className={props?.item?.icon} />}
                {props?.item?.title}
            </button>
        </li>
    )
}
export default function TabBar(props) {
  return (
    <ul className="nav CommonTabList nav-tabs border-tab" id="top-tab" role="tablist">
        {
            props?.data?.map((item, index)=>(
                <ListTab key={index} onClick={(e)=>props?.onSelect(e)} select={props?.select} item={item}  />
            ))
        }
    </ul>
  )
}
