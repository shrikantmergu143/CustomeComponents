/* eslint-disable no-mixed-operators */
/* eslint-disable eqeqeq */
import React, { useEffect } from 'react'
import Icon from './Icon'
import PropTypes from 'prop-types';
const initialData = {
    leftIconClassName:"",
    type:"text",
    rightIconClassName:"",
    formClass:""
}
export function UUID4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
export default function InputGroup(props = initialData) {
    const id = UUID4()
  return (
    <div className={`${props?.formClass} ${props?.errors ?"form_danger":''} common-form form-group animate__fadeIn`}>
       {props?.label && 
       <label htmlFor={id} className='form-label' >
           {props?.label} {props?.require && <span className='text-danger'> *</span>}
       </label>}
        <div className="input-group input-group--prepend ">
            {props?.leftButton ? (
                <button type='button'onClick={props?.leftClick} className={`btn input-group__prepend input-group-text ${props?.leftIconClassName?props?.leftIconClassName:"" }`}>
                   {props?.leftIcon &&<Icon className={props?.leftIcon} />}
                </button>
            ) :
            props?.leftIcon &&
            <span  onClick={props?.leftClick} className={`input-group__prepend input-group-text ${props?.leftIconClassName?props?.leftIconClassName:"" }`}>
                <Icon className={props?.leftIcon} />
            </span>}
            <input
                className={`input form-control ${props?.className ?props?.className:""}`}
                placeholder={props?.placeholder?props?.placeholder:""}
                type={props?.type}
                value={props?.value}
                onChange={props?.onChange}
                name={props?.name}
                id={id}
                disabled={props?.disabled}
                readOnly={props?.readOnly}
                onWheel={e=>e.target.blur()}
            />
            {props?.rightButton ? (
                <button type='button' onClick={props?.rightClick} className={`btn input-group__prepend input-group-text ${props?.rightIconClassName?props?.rightIconClassName:"" }`}>
                   {props?.rightIcon && <Icon className={props?.rightIcon} />}
                </button>
            ) :
            props?.rightIcon &&
            <span onClick={props?.rightClick} className={`input-group__prepend input-group-text ${props?.rightIconClassName?props?.rightIconClassName:"" }`}>
                <Icon className={props?.rightIcon} />
            </span>}
        </div>
        {(props?.errors && props?.showTextError) && <span className='text-danger animate__fadeIn'>{props?.errors}</span>}
    </div>
  )
}
InputGroup.propTypes = {
    name:PropTypes?.string.isRequired,
    placeholder: PropTypes.string,
    leftIcon: PropTypes.string,
    leftIconClassName: PropTypes.string,
    rightIcon: PropTypes.string,
    rightClick:PropTypes.func,
    rightIconClassName: PropTypes.string,
    leftClick:PropTypes.func,
    leftIconName: PropTypes.string,
    rightIconName: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    className:PropTypes?.string,
    errors:PropTypes?.string,
    label:PropTypes?.string,
    formClass:PropTypes?.string,
    rightButton:PropTypes?.bool,
    leftButton:PropTypes?.bool,
    require:PropTypes?.bool,
    disabled:PropTypes?.bool,
    showTextError:PropTypes?.bool,
    readOnly:PropTypes?.bool
};
InputGroup.defaultProps = {
    showTextError:true,
    readOnly:false,
    formClass:"",
    leftIconClassName:"",
    rightIconClassName:"",
    type:"text",
    errors:""
}