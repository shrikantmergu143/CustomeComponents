import React from 'react'
import PropTypes from 'prop-types';
import Icon from './Icon';

export default function IconButton(props) {
  return (
    <button disabled={props?.disabled} type={props?.type} onClick={props?.onClick} className={`button btn-icon ${props?.className ?props?.className:""} ${props?.btntype?props?.btntype:""}`} >
        <Icon className={props?.icon}/>
    </button>
  )
}
IconButton.propTypes = {
  type:PropTypes?.string,
  onClick:PropTypes?.func,
  btntype:PropTypes?.bool,
  className:PropTypes?.string,
  icon:PropTypes.string,
  disabled:PropTypes?.bool
};
IconButton.defaultProps = {
  type:"button",
  disabled:false
};