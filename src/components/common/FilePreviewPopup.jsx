/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Modal,Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setFilePreview } from '../../redux/actions'
import { getExtension } from '../DashboardPanel/Media/ReactMediaLibraryWrapper'
import IconButton from './IconButton'

export default function FilePreviewPopup(props) {
  return (
    <Modal centered={true} onHide={props?.onHide} show={props?.show} className={"ImageViewPreviewModal Files_preview Profile_view"} >
        <Modal.Body className='position-relative'>
            <div className='controlbars'>
                <div></div>
                <div className="Tooltip-Wrapper">
                    <IconButton icon="close-btn white" onClick={props?.onHide} />
                </div>
            </div>
              <Image src={process.env.REACT_APP_BASE_URL +"/media/" + props?.file_path} style={{height:'100%', width:"100%"}} />
        </Modal.Body>
    </Modal>
  )
}
export function FilePreview() {
  const FilePreview = useSelector((state)=>state?.allReducers?.FilePreview);
  const dispatch = useDispatch();
  const payload = {
    show:false,
    isFile:true,
    file_path:"",
  }
  useEffect(()=>{
    if(FilePreview?.show !== false)
      OnHideModal();
  },[]);

  const OnHideModal = ( ) =>{
    dispatch(setFilePreview(payload))
  }
  return FilePreview?.show && (
    <Modal centered={true} onHide={OnHideModal} show={FilePreview?.show} className={"ImageViewPreviewModal Files_preview Profile_view"} >
        <Modal.Body className='position-relative'>
            <div className='controlbars'>
                <div></div>
                <div className="Tooltip-Wrapper">
                    <IconButton icon="close-btn white" onClick={OnHideModal} />
                </div>
            </div>
            {getExtension(FilePreview?.file_path) === 'pdf' &&
              <embed  src={FilePreview?.file_url} style={{zIndex:1}}  width={"100%"} height={"100%"} frameBorder="0"></embed>
            }

            {!(getExtension(FilePreview?.file_path) === 'svg' || getExtension(FilePreview?.file_path) === 'png' || getExtension(FilePreview?.file_path) === 'pdf')&&
              <iframe src={`https://docs.google.com/gview?url=${process.env.REACT_APP_BASE_URL +"/media/" + FilePreview?.file_path}&embedded=true`}  width={"100%"} height={"100%"} frameBorder="0"></iframe>
            }

            {(getExtension(FilePreview?.file_path) === 'svg' || getExtension(FilePreview?.file_path) === 'png') && 
                <Image src={FilePreview?.file_url} style={{height:'100%', width:"auto"}} />
            }
        </Modal.Body>
    </Modal>
  )
}
