import React, { useEffect } from 'react'
import Icon from './Icon'
import PropTypes from 'prop-types';
import { FormSelect } from 'react-bootstrap';
import { UUID4 } from './InputGroup';

export default function Select( props ) {
    const id = UUID4()
  return (
    <div className={props?.errors?` ${props?.formClass} form_danger form-group animate__fadeIn`:`${props?.formClass} form-group animate__fadeIn`}>
       {props?.label && <label htmlFor={id} className='form-label' >{props?.label} {props?.require && <span className='text-danger'> *</span>}</label>}
        <div className="input-group input-group--prepend ">
            <FormSelect
                className={`input form-control ${props?.className ?props?.className:""}`}
                placeholder={props?.placeholder?props?.placeholder:""}
                value={props?.value}
                onChange={props?.onChange}
                name={props?.name}
                id={id}
            >
                 <option disabled selected>{props?.placeholder}</option>
                 <option value={"1"}>1</option>
                 <option value={"2"}>2</option>
                 <option value={"3"}>3</option>
            </FormSelect>
        </div>
        {props?.errors && <span className='text-danger animate__fadeIn'>{props?.errors}</span>}
    </div>
  )
}
Select.propTypes = {
    name:PropTypes?.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    options: PropTypes.any,
    className:PropTypes?.string,
    errors:PropTypes?.string,
    label:PropTypes?.string,
    require:PropTypes?.bool,
    formClass:PropTypes?.string,
};