import React from 'react'
import Icon from './Icon'

export default function CheckBox(props) {
  return (
    <label className="checkbox">
        <input type="checkbox" onChange={props?.onChange} checked={props?.checked} value={false} />
        <span className="checkbox__marker">
            <span className="checkbox__marker-icon animate__fadeIn">
                <Icon className={"check"} />
            </span>
        </span>
        <span className="d-inline-block ml-2">{props?.label}</span>
    </label>
  )
}
