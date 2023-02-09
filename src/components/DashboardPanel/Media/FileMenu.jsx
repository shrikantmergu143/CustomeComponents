/* eslint-disable react/jsx-no-bind */
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle'
import { useDispatch, useSelector } from 'react-redux'
import { FILES_DELETE } from '../../../Api/constant'
import { PostRequestAPI } from '../../../Api/PostRequest'
import { setCallLogout, setDeleteFileLibraryList, ShowModalConfirm } from '../../../redux/actions'
import Icon from '../../common/Icon'
import { getExtension } from './ReactMediaLibraryWrapper'

export default function FileMenu(props) {
    const access_token =  useSelector((state)=>state?.allReducers?.access_token);
    const MediaFile =  useSelector((state)=>state?.allReducers?.MediaFile);
    const dispatch = useDispatch();
    // const callDeleteFile = () =>{
    //     dispatch(setDeleteFileLibraryList(props))
    // }
    const callDelete = () =>{
        dispatch(ShowModalConfirm({
            Title:"Are you Sure?",
            show:true,
            Description:" Are you want to delete File?",
            id:"",
            callBackModal:()=>callDeleteItemData(props.id),
            ButtonSuccess:"Delete File"
        }))
    }
    const callDeleteItemData =async (id)=>{
        // dispatch(SetDeleteEquipments(id))
        const payload = {
            file_id:id
        }
        const response =await PostRequestAPI(FILES_DELETE, payload, access_token);
        if(response?.status === 403){
            dispatch(setCallLogout())
        }
        // console.log("props?.data?.pagination", props?.data?.pagination)
        props?.callMediaFiles(MediaFile?.pagination?.current_page);
        if(MediaFile?.data?.length === 0){
            if(MediaFile?.pagination?.current_page >1){
                props?.callMediaFiles(MediaFile?.pagination?.current_page-1);
            }else{
                props?.callMediaFiles(1);
            }
        }else{
            props?.callMediaFiles(MediaFile?.pagination?.current_page);
        }

        if(props?.selectedItem?.id === props?.id){
            props?.setSelectedItem((item)=>item?.filter((item)=>item.id !== props.id));
        }
    }
    const callShow = () =>{
        props?.SetModalPreview({
            show:true,
            file_path:props?.file_path
        })
    }
  return (
      <Dropdown className='user-menu file-menu' onClick={(e)=>e.stopPropagation()}>
          <DropdownToggle>
              <Icon className={"ellipsis-vertical"} />
          </DropdownToggle>
          <DropdownMenu >
            {(getExtension(props?.file_name) === "png" || getExtension(props?.file_name) === "svg") && 
            <DropdownItem onClick={callShow}>Open File</DropdownItem>}
             {(getExtension(props?.file_name) !== "svg") && 
                <DropdownItem onClick={callDelete} >Delete</DropdownItem>
             }
          </DropdownMenu>
      </Dropdown>
  )
}
