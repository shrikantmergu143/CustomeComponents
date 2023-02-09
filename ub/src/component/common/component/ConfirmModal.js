/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { ShowModalConfirm } from '../../../redux/actions';
import ButtonPage from './ButtonPage'

export default function ConfirmModal(props) {
  const { ModalPopup } = useSelector((state)=>state?.allReducers);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(ModalPopup === undefined){
        dispatch(ShowModalConfirm({
            Title:"",
            show:false,
            Description:"",
            id:"",
            callBackModal:()=>null,
            ButtonSuccess:""
        }))
    }
  },[]);
  function HandleOnClose(){
      if(ModalPopup?.callBackModal){
        ModalPopup?.callBackModal();
      }
      CloseModal();
  }
  function CloseModal (e){
    dispatch(ShowModalConfirm({
        Title:"",
        show:false,
        Description:"",
        id:"",
        callBackModal:()=>null,
        ButtonSuccess:""
    }))
  }
  return (
    <Modal centered={true} onHide={HandleOnClose} show={ModalPopup?.show} className={"swal-modal"} contentClassName={"swal-overlay swal-overlay--show-modal"}>
        <Modal.Body className='position-relative  p-0'>
            <div className="swal-icon swal-icon--warning">
                <span className="swal-icon--warning__body">
                <span className="swal-icon--warning__dot"></span>
                </span>
            </div>
            <Modal.Title className='pb-0'>{ModalPopup?.Title}</Modal.Title>
            <div className='swal-text '>
                {ModalPopup?.Description}
            </div>
        </Modal.Body>
        <div className='swal-footer mt-0'>
            <ButtonPage onClick={CloseModal} className={"swal-button swal-button--cancel"}>
                Cancel
            </ButtonPage>
            <ButtonPage onClick={HandleOnClose} className={"swal-button swal-button--confirm swal-button--danger"} >
                {ModalPopup?.ButtonSuccess}
            </ButtonPage>
        </div>
    </Modal>
  )
}
