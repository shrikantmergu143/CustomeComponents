/* eslint-disable react/jsx-no-bind */
import React from 'react';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { HideToast } from '../../../redux/actions';

function AutohideExample() {
  const dispatch = useDispatch();
  const {ToastMessage} = useSelector((state)=>state?.allReducers);
  return (
    <Toast className={`custome_toast animated bounceInRight ${ToastMessage?.type}`} onClose={() => dispatch(HideToast())} show={ToastMessage?.show} delay={3000} autohide>
        {ToastMessage?.title && 
        <Toast.Header>
            <strong className="me-auto">{ToastMessage?.title}</strong>
        </Toast.Header>}
        <Toast.Body>{ (typeof ToastMessage?.description === 'string' || ToastMessage?.description instanceof String ) && (ToastMessage?.description)}</Toast.Body>
    </Toast>
  );
}

export default AutohideExample;